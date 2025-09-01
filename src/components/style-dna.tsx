
"use client";

import React, { useEffect } from 'react';
import { Tshirt, Footprints, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';

const StyleDnaProfile = () => {
    useEffect(() => {
        const dnaVisualization = document.querySelector('.dna-visualization') as HTMLElement;
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
                leftNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.2l.5 3.5a2 2 0 0 0 2 1.84L8 11v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1l3.22-.04a2 2 0 0 0 2-1.84l.5-3.5a2 2 0 0 0-1.34-2.2z"></path></svg>`;
                dnaVisualization.appendChild(leftNode);

                const rightNode = document.createElement('div');
                rightNode.className = 'dna-node';
                rightNode.style.left = `${centerX + 40}px`;
                rightNode.style.top = `${yPos}px`;
                rightNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-2.38c0-.46.16-.9.45-1.28L10 6.6a1.4 1.4 0 0 1 2.02 0l5.55 5.74c.29.38.45.82.45 1.28V16"/><path d="M4 20h16"/><path d="M15 16v4"/><path d="M9 16v4"/></svg>`;
                dnaVisualization.appendChild(rightNode);

                if (i < nodes - 1) {
                    const connection = document.createElement('div');
                    connection.className = 'dna-connection';
                    const deltaX = 80;
                    const deltaY = spacing;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                    connection.style.width = `${length}px`;
                    connection.style.left = `${centerX - 40}px`;
                    connection.style.top = `${yPos}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    dnaVisualization.appendChild(connection);
                }
            }
        }
        
        createDNA();
        window.addEventListener('resize', createDNA);

        return () => window.removeEventListener('resize', createDNA);

    }, []);

    return (
        <>
            <style jsx global>{`
                :root {
                    --sd-primary: #000000;
                    --sd-secondary: #ffffff;
                    --sd-accent: #007bff;
                    --sd-accent-light: #4da6ff;
                    --sd-gray: #f8f9fa;
                    --sd-gray-dark: #e9ecef;
                    --sd-text: #212529;
                    --sd-text-light: #6c757d;
                    --sd-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    --sd-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .dark {
                     :root {
                        --sd-primary: #ffffff;
                        --sd-secondary: #1a202c;
                        --sd-accent: #3b82f6;
                        --sd-accent-light: #60a5fa;
                        --sd-gray: #2d3748;
                        --sd-gray-dark: #4a5568;
                        --sd-text: #f7fafc;
                        --sd-text-light: #a0aec0;
                        --sd-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    }
                }
                .sd-container {
                    font-family: 'Poppins', sans-serif;
                    color: var(--sd-text);
                    line-height: 1.6;
                }
                .profile-container {
                    background: var(--sd-secondary);
                    border-radius: 20px;
                    box-shadow: var(--sd-shadow);
                    overflow: hidden;
                }
                .profile-header {
                    background: linear-gradient(120deg, var(--sd-primary) 0%, #2c3e50 100%);
                    color: var(--sd-secondary);
                    padding: 30px;
                    text-align: center;
                    position: relative;
                }
                .profile-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    border: 5px solid var(--sd-secondary);
                    margin: 0 auto 15px;
                    overflow: hidden;
                    background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 50px;
                    color: white;
                }
                .dark .profile-header {
                    background: linear-gradient(120deg, #1a202c 0%, #2d3748 100%);
                    color: #f7fafc;
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
                .profile-stats {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 20px;
                    background: rgba(0, 0, 0, 0.2);
                    padding: 15px;
                    border-radius: 15px;
                    max-width: 500px;
                    margin: 20px auto 0;
                }
                .stat { text-align: center; }
                .stat-value {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--sd-accent-light);
                }
                .stat-label {
                    font-size: 14px;
                    opacity: 0.8;
                }
                .styledna-section {
                    padding: 40px 20px;
                    text-align: center;
                    border-bottom: 1px solid var(--sd-gray-dark);
                }
                .section-title {
                    font-size: 24px;
                    margin-bottom: 30px;
                    color: var(--sd-primary);
                    font-family: 'Montserrat', sans-serif;
                }
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
                    background: var(--sd-accent);
                    opacity: 0.3;
                }
                .dna-node {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--sd-secondary);
                    border: 3px solid var(--sd-accent);
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 15px rgba(0, 123, 255, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: var(--sd-accent);
                    transition: var(--sd-transition);
                    cursor: pointer;
                }
                .dna-node svg { stroke: var(--sd-accent); }
                .dna-node:hover {
                    transform: translate(-50%, -50%) scale(1.2);
                    z-index: 10;
                }
                .dna-connection {
                    position: absolute;
                    height: 2px;
                    background: var(--sd-accent);
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
                    background: var(--sd-gray);
                    padding: 10px 20px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: var(--sd-transition);
                    cursor: pointer;
                }
                .trait:hover {
                    background: var(--sd-accent);
                    color: var(--sd-secondary);
                    transform: translateY(-3px);
                }
                .trait-icon { font-size: 18px; }
                .evolution-section { padding: 40px 20px; text-align: center; }
                .timeline {
                    position: relative;
                    max-width: 800px;
                    margin: 40px auto;
                }
                .timeline::after {
                    content: '';
                    position: absolute;
                    width: 6px;
                    background-color: var(--sd-gray-dark);
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
                .timeline-item:nth-child(odd) {
                    left: 0;
                    padding-right: 40px;
                }
                .timeline-item:nth-child(even) {
                    left: 50%;
                    padding-left: 40px;
                }
                .timeline-content {
                    padding: 20px;
                    background-color: var(--sd-secondary);
                    border-radius: 15px;
                    box-shadow: var(--sd-shadow);
                    position: relative;
                    text-align: left;
                }
                .timeline-date {
                    font-weight: 700;
                    color: var(--sd-accent);
                    margin-bottom: 10px;
                }
                .timeline-dot {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    right: -12px;
                    background-color: var(--sd-secondary);
                    border: 4px solid var(--sd-accent);
                    border-radius: 50%;
                    z-index: 1;
                    top: 20px;
                }
                .timeline-item:nth-child(even) .timeline-dot { left: -12px; }
                .closet-section { padding: 40px 20px; background: var(--sd-gray); text-align: center; }
                .closet-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 20px;
                    margin-top: 30px;
                }
                .closet-item {
                    background: var(--sd-secondary);
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: var(--sd-shadow);
                    transition: var(--sd-transition);
                    cursor: pointer;
                    position: relative;
                }
                .closet-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                .closet-img-container {
                    width: 100%;
                    height: 120px;
                    position: relative;
                }
                .closet-info { padding: 10px; text-align: left;}
                .closet-category { font-size: 12px; color: var(--sd-text-light); }
                .closet-name { font-size: 14px; font-weight: 500; margin-top: 5px; }
                @media (max-width: 768px) {
                    .profile-stats { flex-wrap: wrap; gap: 15px; }
                    .stat { flex: 1 0 40%; }
                    .timeline::after { left: 31px; }
                    .timeline-item { width: 100%; padding-left: 70px; padding-right: 0; left: 0 !important; }
                    .timeline-dot { left: 19px; right: auto; }
                }
                 @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 15px rgba(0, 123, 255, 0.3); }
                    100% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 25px rgba(0, 123, 255, 0.6); }
                }
            `}</style>
            <div className="sd-container">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <User size={50} />
                        </div>
                        <h1 className="profile-name">Alex Johnson</h1>
                        <p className="profile-bio">Fashion explorer with a passion for sustainable streetwear and vintage classics.</p>
                        
                        <div className="profile-stats">
                            <div className="stat">
                                <div className="stat-value">87%</div>
                                <div className="stat-label">Style Match</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">42</div>
                                <div className="stat-label">Items Loved</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">18</div>
                                <div className="stat-label">Styles Created</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="styledna-section">
                        <h2 className="section-title">Your Style DNA</h2>
                        <p>Your unique fashion identity visualized through your preferences and purchases</p>
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
                        <h2 className="section-title">Your Style Evolution</h2>
                        <p>How your fashion preferences have changed over time</p>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-content"><div className="timeline-date">January 2023</div><p>Discovered minimalist fashion. Added 5 neutral pieces to your wardrobe.</p></div>
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
                        <h2 className="section-title">Your Virtual Closet</h2>
                        <p>Items you've loved and added to your collection</p>
                        <div className="closet-grid">
                            <div className="closet-item">
                                <div className="closet-img-container">
                                    <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Denim Jacket" layout="fill" objectFit="cover" />
                                </div>
                                <div className="closet-info"><div className="closet-category">Jacket</div><div className="closet-name">Vintage Denim</div></div>
                            </div>
                             <div className="closet-item">
                                <div className="closet-img-container">
                                    <Image src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Sneakers" layout="fill" objectFit="cover" />
                                </div>
                                <div className="closet-info"><div className="closet-category">Shoes</div><div className="closet-name">Urban Sneakers</div></div>
                            </div>
                             <div className="closet-item">
                                <div className="closet-img-container">
                                    <Image src="https://images.unsplash.com/photo-1582142306909-195724d3a58c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="T-shirt" layout="fill" objectFit="cover" />
                                </div>
                                <div className="closet-info"><div className="closet-category">Top</div><div className="closet-name">Organic Cotton Tee</div></div>
                            </div>
                             <div className="closet-item">
                                <div className="closet-img-container">
                                    <Image src="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Pants" layout="fill" objectFit="cover" />
                                </div>
                                <div className="closet-info"><div className="closet-category">Bottoms</div><div className="closet-name">Cargo Pants</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StyleDnaProfile;

    