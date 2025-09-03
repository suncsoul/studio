
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, Dna, ShoppingBag, Heart, MapPin, Settings, BarChart, Edit2, Camera, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AccountPage = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [user, setUser] = useState({
        name: 'Eleanor Vance',
        bio: 'Fashion explorer with a passion for sustainable streetwear',
        email: 'eleanor.vance@example.com',
        phone: '+1 (555) 123-4567',
        memberSince: 'January 15, 2023',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        userId: ''
    });

    useEffect(() => {
        setIsClient(true);
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            router.push('/login');
        } else {
            // Fetch user data from localStorage if available from signup
            const storedName = localStorage.getItem('userName');
            const storedEmail = localStorage.getItem('userEmail');
            if(storedName) {
                setUser(prevUser => ({ ...prevUser, name: storedName }));
            }
            if(storedEmail) {
                setUser(prevUser => ({ ...prevUser, email: storedEmail }));
            }
        }
    }, [router]);


    const dnaVisualizationRef = useRef(null);

    useEffect(() => {
        if (!user.name || user.userId) return; // Only generate if name is present and ID is not
        const nameParts = user.name.split(' ');
        const initials = nameParts.length > 1 
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
            : user.name.substring(0, 2).toUpperCase();
            
        const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
        setUser(prevUser => ({ ...prevUser, userId: `${initials}-${randomDigits}` }));
    }, [user.name, user.userId]);


    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleProfileSave = () => {
        setIsEditingProfile(false);
        // Here you would typically send the updated user data to a server
        console.log('Profile saved:', user);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target?.result) {
                    setUser({ ...user, avatar: event.target.result as string });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const orderHistory = [
        {
            id: 'ORD-2023-001',
            date: "January 2023",
            status: 'Delivered',
            summary: "Joined KOKIYUM and started exploring minimalist fashion.",
            items: [
                {
                    name: "Organic Cotton Tee",
                    category: "Top",
                    image: "https://images.unsplash.com/photo-1582142306909-195724d3a58c?auto=format&fit=crop&w=300&q=80",
                    hint: "organic t-shirt",
                    price: "₹1,299",
                },
            ]
        },
        {
            id: 'ORD-2023-002',
            date: "March 2023",
            status: 'Delivered',
            summary: "Started experimenting with sustainable brands. Your eco-score increased by 32%.",
            items: [
                {
                    name: "Urban Sneakers",
                    category: "Shoes",
                    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
                    hint: "sneakers shoes",
                    price: "₹3,499",
                },
            ]
        },
        {
            id: 'ORD-2023-003',
            date: "June 2023",
            status: 'Processing',
            summary: "Developed an interest in vintage streetwear. Created 3 new style combinations.",
            items: [
                {
                    name: "Vintage Denim",
                    category: "Jacket",
                    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80",
                    hint: "denim jacket",
                    price: "₹3,599",
                },
                {
                    name: "Cargo Pants",
                    category: "Bottoms",
                    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=300&q=80",
                    hint: "cargo pants",
                    price: "₹2,799",
                },
            ]
        },
        {
            id: 'ORD-2023-004',
            date: "Present",
            status: 'Pending',
            summary: "Your current style is a unique blend of sustainable streetwear with vintage elements.",
            items: []
        },
    ];
    
    const [wishlistItems, setWishlistItems] = useState([
        { name: 'Satin Slip Dress', category: 'Dresses', image: 'https://images.unsplash.com/photo-1627914650529-51fc612b487c?auto=format&fit=crop&w=300&q=80', hint: 'satin slip dress', price: '₹2,899' },
        { name: 'Leather Tote Bag', category: 'Accessories', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=300&q=80', hint: 'leather tote bag', price: '₹4,599' },
        { name: 'Cropped Sweater', category: 'Tops', image: 'https://images.unsplash.com/photo-1588143216885-3162a03525e9?auto=format&fit=crop&w=300&q=80', hint: 'cropped sweater', price: '₹2,499' },
    ]);

    const removeFromWishlist = (itemName: string) => {
        setWishlistItems(wishlistItems.filter(item => item.name !== itemName));
    };

    const virtualClosetItems = orderHistory.flatMap(order => order.items).reduce((unique, item) => {
        if (!unique.some(i => i.name === item.name)) {
            unique.push(item);
        }
        return unique;
    }, [] as { name: string; category: string; image: string; hint: string, price: string }[]);

    const navItems = [
        { name: 'Profile', icon: User },
        { name: 'Style DNA', icon: Dna },
        { name: 'Orders', icon: ShoppingBag },
        { name: 'Wishlist', icon: Heart },
        { name: 'Addresses', icon: MapPin },
        { name: 'Settings', icon: Settings },
    ];


    useEffect(() => {
        if (activeTab !== 'Style DNA') return;

        const dnaVisualization = dnaVisualizationRef.current;
        if (!dnaVisualization) return;

        let animationFrameId: number;

        const createDNA = () => {
             while ((dnaVisualization as HTMLElement).firstChild) {
                (dnaVisualization as HTMLElement).removeChild((dnaVisualization as HTMLElement).firstChild as Node);
            }

            const nodes = 12;
            const centerX = (dnaVisualization as HTMLElement).offsetWidth / 2;
            const centerY = (dnaVisualization as HTMLElement).offsetHeight / 2;
            const radiusX = (dnaVisualization as HTMLElement).offsetWidth / 2 - 30;
            const radiusY = (dnaVisualization as HTMLElement).offsetHeight / 2 - 30;

            const dnaStrand = document.createElement('div');
            dnaStrand.className = 'dna-strand';
            dnaVisualization.appendChild(dnaStrand);

            for (let i = 0; i < nodes; i++) {
                const angle = (i / (nodes -1)) * Math.PI * 2;
                const xPos = centerX + Math.cos(angle) * radiusX;
                const yPos = centerY + Math.sin(angle * 2) * radiusY;

                const node = document.createElement('div');
                node.className = 'dna-node';
                node.style.left = `${xPos}px`;
                node.style.top = `${yPos}px`;
                node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gem"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.5 8.5 17 0"/></svg>`;
                dnaVisualization.appendChild(node);
            }
            
            const dnaNodes = document.querySelectorAll('.dna-node');
            dnaNodes.forEach((node, index) => {
                const el = node as HTMLElement;
                el.style.animation = `pulse 2s ${index * 0.2}s infinite alternate`;
            });
        }
        
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(createDNA);
        });

        if (dnaVisualization) {
            resizeObserver.observe(dnaVisualization);
        }
        
        return () => {
            if (dnaVisualization) {
                resizeObserver.unobserve(dnaVisualization as Element);
            }
            cancelAnimationFrame(animationFrameId);
        }

    }, [activeTab]);


    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className="profile-card">
                        <div className="profile-card-header items-center justify-center flex flex-col">
                             <div className="relative group">
                                <div className="profile-avatar">
                                     <Image src={user.avatar} alt="User Avatar" layout="fill" objectFit="cover" data-ai-hint="woman professional portrait" />
                                </div>
                                <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                    <Camera size={32} />
                                    <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            {isEditingProfile ? (
                                <Input name="name" value={user.name} onChange={handleProfileChange} className="text-2xl font-bold bg-transparent border-b-2 border-white/50 text-center w-auto mt-4" />
                            ) : (
                                <h2 className="profile-name">{user.name}</h2>
                            )}
                             {isEditingProfile ? (
                                <textarea name="bio" value={user.bio} onChange={handleProfileChange} className="profile-bio bg-transparent border-b-2 border-white/50 text-center w-full mt-2" />
                            ) : (
                                <p className="profile-bio">{user.bio}</p>
                            )}
                        </div>
                        
                        <div className="profile-info">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Personal Information</h3>
                                {isEditingProfile ? (
                                    <Button onClick={handleProfileSave}>Save Changes</Button>
                                ) : (
                                    <Button variant="outline" onClick={() => setIsEditingProfile(true)}><Edit2 size={16} className="mr-2"/>Edit Profile</Button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="info-group">
                                    <div className="info-label">UNIQUE ID</div>
                                    <div className="info-value">{user.userId}</div>
                                </div>
                                <div className="info-group">
                                    <div className="info-label">EMAIL ADDRESS <span className="text-red-500">*</span></div>
                                     {isEditingProfile ? (
                                        <Input name="email" type="email" value={user.email} onChange={handleProfileChange} />
                                    ) : (
                                        <div className="info-value">{user.email}</div>
                                    )}
                                </div>
                                <div className="info-group">
                                    <div className="info-label">PHONE NUMBER <span className="text-red-500">*</span></div>
                                     {isEditingProfile ? (
                                        <Input name="phone" type="tel" value={user.phone} onChange={handleProfileChange} />
                                    ) : (
                                        <div className="info-value">{user.phone}</div>
                                    )}
                                </div>
                                <div className="info-group">
                                    <div className="info-label">MEMBER SINCE</div>
                                    <div className="info-value member-since">{user.memberSince}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Style DNA':
                return (
                     <>
                        <div className="styledna-section">
                            <h2 className="section-title"><Dna size={24}/> Your Style DNA</h2>
                            <p className='text-muted-foreground'>Your unique fashion identity visualized through your preferences and purchases</p>
                            <div className="dna-visualization" ref={dnaVisualizationRef}></div>
                            <div className="style-traits">
                                <div className="trait"><span className="trait-icon">👟</span><span>Streetwear</span></div>
                                <div className="trait"><span className="trait-icon">🌿</span><span>Sustainable</span></div>
                                <div className="trait"><span className="trait-icon">🎨</span><span>Colorful</span></div>
                                <div className="trait"><span className="trait-icon">👖</span><span>Denim Lover</span></div>
                                <div className="trait"><span className="trait-icon">🔄</span><span>Vintage Mix</span></div>
                            </div>
                        </div>
                        
                        <div className="evolution-section">
                            <h2 className="section-title"><BarChart size={24}/> Your Style Evolution</h2>
                            <p className='text-muted-foreground'>How your fashion preferences have changed since you joined us</p>
                            <div className="timeline">
                                {orderHistory.map((event, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-content">
                                            <div className="timeline-date">{event.date}</div>
                                            <p>{event.summary}</p>
                                        </div>
                                        <div className="timeline-dot"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="closet-section">
                            <h2 className="section-title"><ShoppingBag size={24}/> Your Virtual Closet</h2>
                            <p className='text-muted-foreground'>Items you've loved and added to your collection</p>
                            <div className="closet-grid">
                                {virtualClosetItems.map((item, index) => (
                                <div key={index} className="closet-item">
                                    <div className="closet-img-container">
                                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint={item.hint} />
                                    </div>
                                    <div className="closet-info">
                                        <div className="closet-category">{item.category}</div>
                                        <div className="closet-name">{item.name}</div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
             case 'Orders':
                return (
                    <div className="profile-card">
                         <div className="p-6">
                            <h2 className="section-title"><ShoppingBag size={24}/> Order History</h2>
                             <p className='text-muted-foreground mb-6'>Track your past and current orders.</p>
                             <div className="space-y-4">
                                {orderHistory.filter(o => o.items.length > 0).map(order => (
                                    <div key={order.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{order.id}</h3>
                                                <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                                            </div>
                                            <div className={`text-sm font-medium px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</div>
                                        </div>
                                        <div className="mt-4">
                                            {order.items.map(item => (
                                                <div key={item.name} className="flex items-center gap-4 mt-2">
                                                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" data-ai-hint={item.hint}/>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                             </div>
                         </div>
                    </div>
                );
            case 'Wishlist':
                return (
                    <div className="profile-card">
                        <div className="p-6">
                           <h2 className="section-title"><Heart size={24}/> Your Wishlist</h2>
                           <p className='text-muted-foreground mb-6'>Items you're dreaming of.</p>
                            <div className="closet-grid">
                                {wishlistItems.map((item, index) => (
                                <div key={index} className="closet-item group">
                                    <div className="closet-img-container">
                                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint={item.hint} />
                                         <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="destructive" onClick={() => removeFromWishlist(item.name)}>
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="closet-info">
                                        <div className="closet-category">{item.category}</div>
                                        <div className="closet-name">{item.name}</div>
                                        <div className="font-semibold mt-1">{item.price}</div>
                                    </div>
                                     <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button variant="secondary" size="sm">Add to Cart</Button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Addresses':
                 return (
                    <div className="profile-card">
                         <div className="p-6">
                            <h2 className="section-title"><MapPin size={24}/> Manage Addresses</h2>
                            <p className='text-muted-foreground mb-6'>Update your shipping and billing addresses.</p>
                             <div className="space-y-4">
                                <div className="border rounded-lg p-4 flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">Primary Shipping Address</p>
                                        <p>123 Fashion Ave, Apt 4B</p>
                                        <p>New York, NY 10001</p>
                                        <p>United States</p>
                                    </div>
                                    <Button variant="outline" size="sm"><Edit2 size={14} className="mr-2"/>Edit</Button>
                                </div>
                             </div>
                             <Button className="mt-6">Add New Address</Button>
                         </div>
                    </div>
                );
            case 'Settings':
                return (
                     <div className="profile-card">
                         <div className="p-6">
                            <h2 className="section-title"><Settings size={24}/> Account Settings</h2>
                            <p className='text-muted-foreground mb-6'>Manage your account preferences.</p>
                             <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Change Password</h3>
                                    <div className="space-y-2 max-w-sm">
                                        <Input type="password" placeholder="Current Password" />
                                        <Input type="password" placeholder="New Password" />
                                        <Input type="password" placeholder="Confirm New Password" />
                                        <Button>Update Password</Button>
                                    </div>
                                </div>
                                <div className="border-t pt-6">
                                     <h3 className="font-semibold mb-2">Notification Preferences</h3>
                                     <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="promo-emails">Promotional Emails</label>
                                            <Input type="checkbox" id="promo-emails" className="w-4 h-4" defaultChecked/>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="order-updates">Order Updates</label>
                                            <Input type="checkbox" id="order-updates" className="w-4 h-4" defaultChecked/>
                                        </div>
                                     </div>
                                </div>
                             </div>
                         </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isClient) {
        return null; // Render nothing on the server
    }


    return (
        <>
        <style jsx global>{`
            :root {
                --acc-primary: #000000;
                --acc-secondary: #ffffff;
                --acc-accent: #007bff;
                --acc-accent-light: #4da6ff;
                --acc-gray: #f8f9fa;
                --acc-gray-dark: #e9ecef;
                --acc-text: #212529;
                --acc-text-light: #6c757d;
                --acc-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                --acc-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            .dark {
                --acc-primary: hsl(var(--primary-foreground));
                --acc-secondary: hsl(var(--secondary));
                --acc-accent: #3b82f6;
                --acc-accent-light: #60a5fa;
                --acc-gray: hsl(var(--muted));
                --acc-gray-dark: hsl(var(--border));
                --acc-text: hsl(var(--foreground));
                --acc-text-light: hsl(var(--muted-foreground));
                --acc-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            .account-page-body {
                font-family: 'Poppins', sans-serif;
                color: var(--acc-text);
                background: var(--acc-gray);
                line-height: 1.6;
                min-height: 100vh;
                padding: 2rem;
            }
            .account-container {
                max-width: 1400px;
                margin: 0 auto;
            }
            .account-header {
                text-align: center;
                margin-bottom: 2.5rem;
            }
            .account-title {
                font-size: 2.5rem;
                font-family: 'Montserrat', sans-serif;
                color: var(--acc-primary);
                margin-bottom: 0.5rem;
                font-weight: 700;
            }
            .account-subtitle {
                color: var(--acc-text-light);
                font-size: 1.125rem;
            }
            .account-layout {
                display: flex;
                gap: 2rem;
                align-items: flex-start;
            }
            .sidebar {
                flex: 1;
                min-width: 280px;
                height: fit-content;
                position: sticky;
                top: 80px;
            }
            .main-content {
                flex: 3;
                min-width: 300px;
            }
            .profile-card {
                background: var(--acc-secondary);
                border-radius: var(--radius);
                box-shadow: var(--acc-shadow);
                overflow: hidden;
                border: 1px solid var(--acc-gray-dark);
            }
            .profile-card-header {
                background: linear-gradient(120deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%);
                color: hsl(var(--primary-foreground));
                padding: 2rem;
                position: relative;
            }
            .dark .profile-card-header {
                 background: linear-gradient(120deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.8) 100%);
            }
            .profile-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 4px solid var(--acc-secondary);
                margin: 0 auto 1rem;
                overflow: hidden;
                position: relative;
            }
            .profile-name {
                font-size: 1.75rem;
                margin-bottom: 0.25rem;
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
            }
            .profile-bio {
                opacity: 0.9;
                max-width: 500px;
                margin: 0 auto;
                min-height: 40px;
                font-size: 0.9rem;
            }
            .profile-info { padding: 1.5rem; }
            .info-group {
                margin-bottom: 1.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid var(--acc-gray-dark);
            }
             .info-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
            .info-label {
                font-size: 0.75rem;
                color: var(--acc-text-light);
                margin-bottom: 0.25rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .info-value { font-size: 1rem; font-weight: 500; }
            .info-value.member-since { color: hsl(var(--primary)); }
            .dark .info-value.member-since { color: hsl(var(--primary-foreground)); }
            .navigation-card {
                 background: var(--acc-secondary);
                 border-radius: var(--radius);
                 box-shadow: var(--acc-shadow);
                 padding: 1rem;
                 border: 1px solid var(--acc-gray-dark);
            }
            .nav-item {
                display: flex;
                align-items: center;
                padding: 0.875rem 1rem;
                border-radius: calc(var(--radius) - 4px);
                margin-bottom: 0.25rem;
                cursor: pointer;
                transition: var(--acc-transition);
                font-weight: 500;
                color: var(--acc-text);
            }
            .nav-item.active {
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
            }
            .nav-item.active svg {
                 color: hsl(var(--primary-foreground));
            }
            .nav-item:hover:not(.active) { background: var(--acc-gray); }
            .nav-icon {
                margin-right: 1rem;
                color: var(--acc-text-light);
            }
            .styledna-section, .evolution-section, .closet-section, .orders-section, .wishlist-section, .addresses-section, .settings-section {
                background: var(--acc-secondary);
                border-radius: var(--radius);
                box-shadow: var(--acc-shadow);
                padding: 2rem;
                margin-bottom: 2rem;
                 border: 1px solid var(--acc-gray-dark);
            }
            .section-title {
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
                color: var(--acc-primary);
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .section-title .lucide { color: hsl(var(--primary)); }
            .dark .section-title .lucide { color: hsl(var(--primary-foreground)); }
            .dna-visualization {
                width: 100%;
                height: 200px;
                position: relative;
                margin: 40px 0;
            }
            .dna-node {
                position: absolute;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: var(--acc-secondary);
                border: 3px solid hsl(var(--primary));
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px hsl(var(--primary) / 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: hsl(var(--primary));
                transition: var(--acc-transition);
                cursor: pointer;
            }
            .dna-node:hover {
                transform: translate(-50%, -50%) scale(1.2);
                z-index: 10;
            }
            .style-traits {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 1rem;
                margin-top: 2.5rem;
            }
            .trait {
                background: var(--acc-gray);
                padding: 0.75rem 1.25rem;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: var(--acc-transition);
                cursor: pointer;
            }
            .trait:hover {
                background: hsl(var(--primary));
                color: hsl(var(--primary-foreground));
                transform: translateY(-3px);
            }
            .trait-icon { font-size: 1.125rem; }
            .timeline {
                position: relative;
                max-width: 800px;
                margin: 40px auto;
            }
            .timeline::after {
                content: '';
                position: absolute;
                width: 4px;
                background-color: var(--acc-gray-dark);
                top: 0;
                bottom: 0;
                left: 50%;
                margin-left: -2px;
                border-radius: 10px;
            }
            .timeline-item {
                position: relative;
                width: 50%;
                padding: 0 2.5rem;
                margin-bottom: 3rem;
            }
            .timeline-item:nth-child(even) { left: 50%; }
            .timeline-item:nth-child(odd) { text-align: right; }
             .timeline-item:nth-child(odd)::after {
                right: -12px;
            }
             .timeline-item:nth-child(even)::after {
                left: -12px;
            }
            .timeline-content {
                padding: 1.5rem;
                background-color: var(--acc-gray);
                border-radius: var(--radius);
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
                position: relative;
            }
            .timeline-date {
                font-weight: 700;
                color: hsl(var(--primary));
                margin-bottom: 0.5rem;
            }
            .dark .timeline-date { color: hsl(var(--primary-foreground)); }
            .timeline-dot {
                position: absolute;
                width: 24px;
                height: 24px;
                background-color: var(--acc-secondary);
                border: 4px solid hsl(var(--primary));
                border-radius: 50%;
                z-index: 1;
                top: 20px;
            }
            .timeline-item:nth-child(odd) .timeline-dot { right: -12px; }
            .timeline-item:nth-child(even) .timeline-dot { left: -12px; }
            .closet-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 1.5rem;
                margin-top: 1.5rem;
            }
            .closet-item {
                background: var(--acc-gray);
                border-radius: var(--radius);
                overflow: hidden;
                box-shadow: var(--acc-shadow);
                transition: var(--acc-transition);
                cursor: pointer;
                position: relative;
            }
            .closet-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
            .closet-img-container {
                width: 100%;
                aspect-ratio: 1/1;
                position: relative;
                background: white;
            }
            .closet-info { padding: 0.75rem; text-align: center; }
            .closet-category { font-size: 0.75rem; color: var(--acc-text-light); }
            .closet-name {
                font-size: 0.9rem;
                font-weight: 500;
                margin-top: 0.25rem;
            }
            @media (max-width: 960px) {
                .account-layout { flex-direction: column; }
                .sidebar { width: 100%; position: static; }
            }
            @media (max-width: 768px) {
                .timeline::after { left: 1.5rem; }
                .timeline-item { width: 100%; padding-left: 4rem; padding-right: 0; left: 0 !important; text-align: left !important; }
                .timeline-dot { left: calc(1.5rem - 10px); right: auto; }
            }
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 15px hsl(var(--primary) / 0.3); }
                100% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 25px hsl(var(--primary) / 0.6); }
            }
        `}</style>

        <div className="account-page-body">
            <div className="account-container">
                <div className="account-header">
                    <h1 className="account-title">My Account</h1>
                    <p className="account-subtitle">Manage your profile and discover your unique Style DNA</p>
                </div>
                
                <div className="account-layout">
                    <div className="sidebar">
                        <div className="navigation-card">
                             {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div 
                                        key={item.name} 
                                        className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
                                        onClick={() => setActiveTab(item.name)}
                                    >
                                        <div className="nav-icon"><Icon size={20} /></div>
                                        <div>{item.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="main-content">
                       {renderContent()}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AccountPage;
