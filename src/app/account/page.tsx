
"use client";

import React, { useEffect, useState } from 'react';
import { User, Dna, ShoppingBag, Heart, MapPin, Settings, ChevronRight, Camera, BarChart, Gem } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const AccountPage = () => {

    useEffect(() => {
        const dnaVisualization = document.querySelector('.dna-visualization');
        if (!dnaVisualization) return;

        // Clear previous elements
        while (dnaVisualization.firstChild) {
            dnaVisualization.removeChild(dnaVisualization.firstChild);
        }

        function createDNA() {
            if (!dnaVisualization) return;
            const nodes = 12;
            const centerX = dnaVisualization.offsetWidth / 2;
            const spacing = dnaVisualization.offsetHeight / (nodes - 1);

            const dnaStrand = document.createElement('div');
            dnaStrand.className = 'dna-strand';
            dnaVisualization.appendChild(dnaStrand);

            for (let i = 0; i < nodes; i++) {
                const yPos = i * spacing;

                const leftNode = document.createElement('div');
                leftNode.className = 'dna-node';
                leftNode.style.left = `${centerX - 40}px`;
                leftNode.style.top = `${yPos}px`;
                leftNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gem"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.5 8.5 17 0"/></svg>`;
                dnaVisualization.appendChild(leftNode);

                const rightNode = document.createElement('div');
                rightNode.className = 'dna-node';
                rightNode.style.left = `${centerX + 40}px`;
                rightNode.style.top = `${yPos}px`;
                rightNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
                dnaVisualization.appendChild(rightNode);

                if (i < nodes - 1) {
                    const connection = document.createElement('div');
                    connection.className = 'dna-connection';
                    const deltaX = 80;
                    const deltaY = spacing;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    connection.style.width = `${length}px`;
                    connection.style.left = `${centerX - 40}px`;
                    connection.style.top = `${yPos}px`;
                    connection.style.transform = `rotate(${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg)`;
                    dnaVisualization.appendChild(connection);
                }
            }
        }
        
        createDNA();
        window.addEventListener('resize', createDNA);
        
        const nodes = document.querySelectorAll('.dna-node');
        nodes.forEach((node, index) => {
            const el = node as HTMLElement;
            el.style.animation = `pulse 2s ${index * 0.2}s infinite alternate`;
        });
        
        return () => window.removeEventListener('resize', createDNA);

    }, []);

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
                :root {
                    --acc-primary: #ffffff;
                    --acc-secondary: #1a202c;
                    --acc-accent: #3b82f6;
                    --acc-accent-light: #60a5fa;
                    --acc-gray: #2d3748;
                    --acc-gray-dark: #4a5568;
                    --acc-text: #f7fafc;
                    --acc-text-light: #a0aec0;
                    --acc-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
            }
            .account-page-body {
                font-family: 'Poppins', sans-serif;
                color: var(--acc-text);
                background: linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%);
                line-height: 1.6;
                min-height: 100vh;
                padding: 20px;
            }
            .account-container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .account-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .account-title {
                font-size: 32px;
                font-family: 'Montserrat', sans-serif;
                color: var(--acc-primary);
                margin-bottom: 10px;
            }
            .account-subtitle {
                color: var(--acc-text-light);
                font-size: 18px;
            }
            .account-layout {
                display: flex;
                gap: 30px;
                flex-wrap: wrap;
            }
            .sidebar {
                flex: 1;
                min-width: 280px;
                height: fit-content;
            }
            .main-content {
                flex: 2;
                min-width: 300px;
            }
            .profile-card {
                background: var(--acc-secondary);
                border-radius: 15px;
                box-shadow: var(--acc-shadow);
                overflow: hidden;
                margin-bottom: 30px;
            }
            .profile-card-header {
                background: linear-gradient(120deg, var(--acc-primary) 0%, #2c3e50 100%);
                color: var(--acc-secondary);
                padding: 30px;
                text-align: center;
                position: relative;
            }
            .dark .profile-card-header {
                 background: linear-gradient(120deg, #1a202c 0%, #2d3748 100%);
            }
            .profile-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 5px solid var(--acc-secondary);
                margin: 0 auto 15px;
                overflow: hidden;
                position: relative;
            }
            .profile-name {
                font-size: 28px;
                margin-bottom: 5px;
                font-family: 'Montserrat', sans-serif;
            }
            .profile-bio {
                opacity: 0.9;
                max-width: 500px;
                margin: 0 auto;
            }
            .profile-info { padding: 25px; }
            .info-group {
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--acc-gray-dark);
            }
            .info-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
            .info-label {
                font-size: 14px;
                color: var(--acc-text-light);
                margin-bottom: 5px;
            }
            .info-value { font-size: 16px; font-weight: 500; }
            .info-value.member-since { color: var(--acc-accent); }
            .navigation-card {
                 background: var(--acc-secondary);
                 border-radius: 15px;
                 box-shadow: var(--acc-shadow);
                 padding: 15px;
            }
            .nav-item {
                display: flex;
                align-items: center;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 5px;
                cursor: pointer;
                transition: var(--acc-transition);
                font-weight: 500;
                color: var(--acc-text);
            }
            .nav-item.active {
                background: var(--acc-accent);
                color: var(--acc-secondary);
            }
            .nav-item.active svg {
                 color: var(--acc-secondary);
            }
            .nav-item:hover:not(.active) { background: var(--acc-gray); }
            .nav-icon {
                width: 35px;
                font-size: 18px;
                color: var(--acc-text-light);
            }
            .styledna-section {
                background: var(--acc-secondary);
                border-radius: 15px;
                box-shadow: var(--acc-shadow);
                padding: 30px;
                margin-bottom: 30px;
            }
            .section-title {
                font-size: 24px;
                margin-bottom: 20px;
                color: var(--acc-primary);
                font-family: 'Montserrat', sans-serif;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .section-title .lucide { color: var(--acc-accent); }
            .dna-visualization {
                width: 100%;
                height: 200px;
                position: relative;
                margin: 40px 0;
            }
            .dna-strand {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 5px;
                height: 100%;
                background: var(--acc-accent);
                opacity: 0.3;
            }
            .dna-node {
                position: absolute;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: var(--acc-secondary);
                border: 3px solid var(--acc-accent);
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px rgba(0, 123, 255, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: var(--acc-accent);
                transition: var(--acc-transition);
                cursor: pointer;
            }
            .dna-node:hover {
                transform: translate(-50%, -50%) scale(1.2);
                z-index: 10;
            }
            .dna-connection {
                position: absolute;
                height: 2px;
                background: var(--acc-accent);
                transform-origin: 0 0;
                opacity: 0.5;
            }
            .style-traits {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 15px;
                margin-top: 40px;
            }
            .trait {
                background: var(--acc-gray);
                padding: 10px 20px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: var(--acc-transition);
                cursor: pointer;
            }
            .trait:hover {
                background: var(--acc-accent);
                color: var(--acc-secondary);
                transform: translateY(-3px);
            }
            .trait-icon { font-size: 18px; }
            .evolution-section {
                background: var(--acc-secondary);
                border-radius: 15px;
                box-shadow: var(--acc-shadow);
                padding: 30px;
                margin-bottom: 30px;
            }
            .timeline {
                position: relative;
                max-width: 800px;
                margin: 40px auto;
            }
            .timeline::after {
                content: '';
                position: absolute;
                width: 6px;
                background-color: var(--acc-gray-dark);
                top: 0;
                bottom: 0;
                left: 50%;
                margin-left: -3px;
                border-radius: 10px;
            }
            .timeline-item {
                position: relative;
                width: 50%;
                margin-bottom: 50px;
            }
            .timeline-item:nth-child(even) { left: 50%; padding-left: 40px; }
            .timeline-item:nth-child(odd) { left: 0; padding-right: 40px; text-align: right; }
            .timeline-content {
                padding: 20px;
                background-color: var(--acc-gray);
                border-radius: 15px;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
                position: relative;
            }
            .timeline-date {
                font-weight: 700;
                color: var(--acc-accent);
                margin-bottom: 10px;
            }
            .timeline-dot {
                position: absolute;
                width: 24px;
                height: 24px;
                background-color: var(--acc-secondary);
                border: 4px solid var(--acc-accent);
                border-radius: 50%;
                z-index: 1;
                top: 20px;
            }
            .timeline-item:nth-child(odd) .timeline-dot { right: -12px; }
            .timeline-item:nth-child(even) .timeline-dot { left: -12px; }
            .closet-section {
                background: var(--acc-secondary);
                border-radius: 15px;
                box-shadow: var(--acc-shadow);
                padding: 30px;
            }
            .closet-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .closet-item {
                background: var(--acc-gray);
                border-radius: 15px;
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
            }
            .closet-info { padding: 10px; text-align: center; }
            .closet-category { font-size: 12px; color: var(--acc-text-light); }
            .closet-name {
                font-size: 14px;
                font-weight: 500;
                margin-top: 5px;
            }
            @media (max-width: 960px) {
                .account-layout { flex-direction: column; }
                .sidebar { width: 100%; }
            }
            @media (max-width: 768px) {
                .timeline::after { left: 31px; }
                .timeline-item { width: 100%; padding-left: 70px; padding-right: 0; left: 0 !important; text-align: left !important; }
                .timeline-dot { left: 19px; right: auto; }
            }
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 15px rgba(0, 123, 255, 0.3); }
                100% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 25px rgba(0, 123, 255, 0.6); }
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
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div className="profile-avatar">
                                    <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" alt="User Avatar" layout="fill" objectFit="cover" data-ai-hint="woman professional portrait" />
                                </div>
                                <h2 className="profile-name">Eleanor Vance</h2>
                                <p className="profile-bio">Fashion explorer with a passion for sustainable streetwear</p>
                            </div>
                            
                            <div className="profile-info">
                                <div className="info-group">
                                    <div className="info-label">UNIQUE ID</div>
                                    <div className="info-value">KOKI-7382-4916</div>
                                </div>
                                
                                <div className="info-group">
                                    <div className="info-label">EMAIL ADDRESS</div>
                                    <div className="info-value">eleanor.vance@example.com</div>
                                </div>
                                
                                <div className="info-group">
                                    <div className="info-label">PHONE NUMBER</div>
                                    <div className="info-value">+1 (555) 123-4567</div>
                                </div>
                                
                                <div className="info-group">
                                    <div className="info-label">MEMBER SINCE</div>
                                    <div className="info-value member-since">January 15, 2023</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="navigation-card">
                            <div className="nav-item active">
                                <div className="nav-icon"><Dna size={18} /></div>
                                <div>Style DNA</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-icon"><ShoppingBag size={18} /></div>
                                <div>Orders</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-icon"><Heart size={18} /></div>
                                <div>Wishlist</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-icon"><MapPin size={18} /></div>
                                <div>Addresses</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-icon"><Settings size={18} /></div>
                                <div>Settings</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="main-content">
                        <div className="styledna-section">
                            <h2 className="section-title"><Dna size={24}/> Your Style DNA</h2>
                            <p className='text-muted-foreground'>Your unique fashion identity visualized through your preferences and purchases</p>
                            <div className="dna-visualization"></div>
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
                                <div className="timeline-item">
                                    <div className="timeline-content"><div className="timeline-date">January 2023</div><p>Joined KOKIYUM and started exploring minimalist fashion.</p></div>
                                    <div className="timeline-dot"></div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-content"><div className="timeline-date">March 2023</div><p>Started experimenting with sustainable brands. Your eco-score increased by 32%.</p></div>
                                    <div className="timeline-dot"></div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-content"><div className="timeline-date">June 2023</div><p>Developed an interest in vintage streetwear. Created 3 new style combinations.</p></div>
                                    <div className="timeline-dot"></div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-content"><div className="timeline-date">Present</div><p>Your current style is a unique blend of sustainable streetwear with vintage elements.</p></div>
                                    <div className="timeline-dot"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="closet-section">
                            <h2 className="section-title"><ShoppingBag size={24}/> Your Virtual Closet</h2>
                            <p className='text-muted-foreground'>Items you've loved and added to your collection since January 2023</p>
                            <div className="closet-grid">
                                <div className="closet-item">
                                    <div className="closet-img-container">
                                        <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80" alt="Denim Jacket" layout="fill" objectFit="cover" data-ai-hint="denim jacket" />
                                    </div>
                                    <div className="closet-info"><div className="closet-category">Jacket</div><div className="closet-name">Vintage Denim</div></div>
                                </div>
                                <div className="closet-item">
                                    <div className="closet-img-container">
                                        <Image src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80" alt="Sneakers" layout="fill" objectFit="cover" data-ai-hint="sneakers shoes" />
                                    </div>
                                    <div className="closet-info"><div className="closet-category">Shoes</div><div className="closet-name">Urban Sneakers</div></div>
                                </div>
                                <div className="closet-item">
                                    <div className="closet-img-container">
                                        <Image src="https://images.unsplash.com/photo-1582142306909-195724d3a58c?auto=format&fit=crop&w=300&q=80" alt="T-shirt" layout="fill" objectFit="cover" data-ai-hint="organic t-shirt" />
                                    </div>
                                    <div className="closet-info"><div className="closet-category">Top</div><div className="closet-name">Organic Cotton Tee</div></div>
                                </div>
                                <div className="closet-item">
                                     <div className="closet-img-container">
                                        <Image src="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=300&q=80" alt="Pants" layout="fill" objectFit="cover" data-ai-hint="cargo pants" />
                                    </div>
                                    <div className="closet-info"><div className="closet-category">Bottoms</div><div className="closet-name">Cargo Pants</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AccountPage;

    