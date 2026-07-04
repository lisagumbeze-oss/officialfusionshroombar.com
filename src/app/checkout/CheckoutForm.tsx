'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CartLineItem from '@/components/CartLineItem/CartLineItem';
import { AlertTriangle } from 'lucide-react';
import styles from './checkout.module.css';

export default function CheckoutForm({ 
    dbPaymentMethods,
    shippingSettings
}: { 
    dbPaymentMethods: any[],
    shippingSettings: any[]
}) {
    const router = useRouter();
    const { cart, cartTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [region, setRegion] = useState('LOCAL'); // LOCAL (USA) or INTERNATIONAL
    const [shippingOption, setShippingOption] = useState<any>(null);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState('');

    const subtotal = cartTotal;
    const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const shippingPrice = shippingOption ? shippingOption.price : 0;
    const total = subtotal - discount + shippingPrice;

    // Get current region settings
    const currentShippingSettings = shippingSettings.find(s => s.type === region) || {
        category1Name: 'Standard', category1Price: region === 'LOCAL' ? 15 : 45,
        category2Name: 'Express', category2Price: region === 'LOCAL' ? 35 : 85
    };

    const shippingOptions = [
        { id: 'cat1', name: currentShippingSettings.category1Name, price: currentShippingSettings.category1Price },
        { id: 'cat2', name: currentShippingSettings.category2Name, price: currentShippingSettings.category2Price },
    ];

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponError('');
        try {
            const res = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode, subtotal })
            });
            const data = await res.json();
            if (res.ok) {
                setAppliedCoupon(data);
                setCouponCode('');
            } else {
                setCouponError(data.error);
            }
        } catch (e) {
            setCouponError('Failed to validate coupon');
        }
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!shippingOption) {
            alert('Please select a shipping method.');
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const orderData = {
            customerName: formData.get('firstName') + ' ' + formData.get('lastName'),
            customerEmail: formData.get('email'),
            customerPhone: formData.get('phone'),
            shippingAddress: `${formData.get('address')}, ${formData.get('city')}, ${formData.get('state')} ${formData.get('zip')}, ${formData.get('country')}`,
            shippingMethod: shippingOption.name,
            shippingPrice: shippingOption.price,
            totalAmount: total,
            paymentMethodId: selectedMethod === 'CRYPTO' ? 'CRYPTO' : selectedMethod,
            items: cart.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            })),
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    const text = await res.text();
                    console.error('Failed to parse order response as JSON:', text);
                    alert('Server returned an invalid response. Please check the console for details.');
                    setIsSubmitting(false);
                    return;
                }
                
                if (selectedMethod === 'CRYPTO') {
                    // Create Plisio Invoice
                    const cryptoRes = await fetch('/api/checkout/crypto-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderId: data.id }),
                    });
                    
                    if (cryptoRes.ok) {
                        let cryptoData;
                        try {
                            cryptoData = await cryptoRes.json();
                        } catch (e) {
                            const text = await cryptoRes.text();
                            console.error('Failed to parse crypto response as JSON:', text);
                            alert('Payment system returned an invalid response. Please check the console for details.');
                            setIsSubmitting(false);
                            return;
                        }
                        clearCart();
                        window.location.href = cryptoData.invoiceUrl;
                        return;
                    } else {
                        let cryptoErr;
                        try {
                            cryptoErr = await cryptoRes.json();
                        } catch (e) {
                            cryptoErr = { error: 'Failed to initiate crypto payment (and could not parse error response).' };
                        }
                        alert(cryptoErr.error || 'Failed to initiate crypto payment.');
                    }
                } else {
                    clearCart();
                    router.push(`/checkout/success?orderId=${data.id}`);
                }
            } else {
                const errData = await res.json();
                alert(errData.error || 'Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const selectedPaymentInfo = dbPaymentMethods.find(m => m.id === selectedMethod);

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h2>Your cart is empty</h2>
                <p>Add items before checking out.</p>
                <button type="button" onClick={() => router.push('/shop')} className="btn btn-primary">
                    Continue shopping
                </button>
            </div>
        );
    }

    return (
        <div className={styles.checkoutLayout}>
            <div className={styles.formSection}>
                <form id="checkout-form" onSubmit={handleSubmit}>
                    <h2 className={styles.sectionTitle}>Billing &amp; shipping</h2>
                    <div className={styles.inputGroup}>
                        <label>Country / Region*</label>
                        <select 
                            name="country" 
                            required 
                            className={styles.select}
                            onChange={(e) => {
                                setRegion(e.target.value === 'United States' ? 'LOCAL' : 'INTERNATIONAL');
                                setShippingOption(null); // Reset shipping when country changes
                            }}
                        >
                            <option value="United States">United States (USA)</option>
                            <option value="International">International (Worldwide)</option>
                        </select>
                    </div>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>First Name*</label>
                            <input type="text" name="firstName" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Last Name*</label>
                            <input type="text" name="lastName" required />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address*</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <input type="tel" name="phone" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Street Address*</label>
                        <input type="text" name="address" required />
                    </div>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label>City*</label>
                            <input type="text" name="city" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>State / Province*</label>
                            <input type="text" name="state" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>ZIP / Postal Code*</label>
                            <input type="text" name="zip" required />
                        </div>
                    </div>

                    <div className={styles.shippingSection}>
                        <h2 className={styles.sectionTitle}>Shipping method</h2>
                        <div className={styles.shippingOptions}>
                            {shippingOptions.map(option => (
                                <label key={option.id} className={`${styles.shippingOption} ${shippingOption?.id === option.id ? styles.selected : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="shipping" 
                                        checked={shippingOption?.id === option.id}
                                        onChange={() => setShippingOption(option)}
                                        required
                                    />
                                    <div className={styles.shippingInfo}>
                                        <span className={styles.shippingName}>{option.name}</span>
                                        <span className={styles.shippingPrice}>${option.price.toFixed(2)}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            <div className={styles.summarySection}>
                <div className={styles.orderSummary}>
                    <h2 className={styles.sectionTitle}>Your order</h2>
                    <div className={styles.lineItems}>
                        {cart.map((item) => (
                            <CartLineItem key={item.id} item={item} variant="checkout" />
                        ))}
                    </div>

                    <div className={styles.summaryTotals}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {appliedCoupon && (
                            <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                                <span>Discount ({appliedCoupon.code})</span>
                                <span>−${appliedCoupon.discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        {shippingOption && (
                            <div className={styles.summaryRow}>
                                <span>Shipping ({shippingOption.name})</span>
                                <span>${shippingOption.price.toFixed(2)}</span>
                            </div>
                        )}

                        <div className={styles.couponSection}>
                            <input
                                type="text"
                                placeholder="Promo code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            />
                            <button type="button" onClick={handleApplyCoupon}>Apply</button>
                        </div>
                        {couponError && <p className={styles.couponError}>{couponError}</p>}

                        <div className={styles.summarySeparator} />
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.paymentMethods}>
                    <h2 className={styles.sectionTitle}>Payment method</h2>
                    {dbPaymentMethods.length === 0 ? (
                        <p className={styles.errorText}>No payment methods active. Please contact support.</p>
                    ) : (
                        <div className={styles.methodOptions}>
                            {/* Hardcoded Cryptocurrency Option */}
                            <label className={`${styles.methodOption} ${selectedMethod === 'CRYPTO' ? styles.selected : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CRYPTO"
                                    checked={selectedMethod === 'CRYPTO'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    required
                                    form="checkout-form"
                                />
                                <div className={styles.methodInfo}>
                                    <strong>Cryptocurrency (BTC, ETH, LTC, USDT, etc.)</strong>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginLeft: '0.5rem' }}>Powered by Plisio</span>
                                </div>
                            </label>

                            {dbPaymentMethods.map((method) => (
                                <label key={method.id} className={`${styles.methodOption} ${selectedMethod === method.id ? styles.selected : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={selectedMethod === method.id}
                                        onChange={(e) => setSelectedMethod(e.target.value)}
                                        required
                                        form="checkout-form"
                                    />
                                    <div className={styles.methodInfo}>
                                        <strong>{method.name}</strong>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}

                    {selectedPaymentInfo && (
                        <div className={styles.paymentInstructions}>
                            <p><strong>Pay to:</strong> {selectedPaymentInfo.details}</p>
                            {selectedPaymentInfo.instructions && <p>{selectedPaymentInfo.instructions}</p>}
                            <p className={styles.noticeText}><em>Please place your order first, then send the payment to the address above. Your order will be processed once payment is confirmed.</em></p>
                        </div>
                    )}

                    {selectedMethod === 'CRYPTO' && (
                        <div className={styles.paymentInstructions} style={{ borderLeftColor: 'var(--primary)' }}>
                            <p><strong>Crypto Payment:</strong> You will be redirected to Plisio's secure gateway after clicking "PLACE ORDER" to complete your payment with the cryptocurrency of your choice.</p>
                            <p className={styles.noticeText}><em>Real-time exchange rates will be applied.</em></p>
                        </div>
                    )}
                </div>

                <button
                    form="checkout-form"
                    type="submit"
                    className={styles.placeOrderBtn}
                    disabled={isSubmitting || !selectedMethod || !shippingOption || total < 100}
                >
                    {isSubmitting ? 'Processing…' : 'Place order'}
                </button>
                {total < 100 && (
                    <div className={styles.minimumOrderWarning}>
                        <AlertTriangle size={20} />
                        <p>Minimum order is <strong>$100.00</strong> including shipping. Add more items to continue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
