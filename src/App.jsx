import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Globe, Search, Compass, MapPin, Building2, Landmark, TreeSprout, 
  ChevronRight, ChevronLeft, ShieldCheck, TrendingUp, Users, ArrowUpRight, 
  Sparkles, Layers, Sliders, Play, Pause, CheckCircle2, Mail, ExternalLink, 
  X, Menu, DollarSign, Award, Eye, Zap, RefreshCw, BarChart3, Navigation
} from 'lucide-react';

// High Quality Images for Property Journey
const SLIDES_DATA = [
  {
    id: 'historical',
    category: 'Historical Architecture',
    badge: 'HERITAGE & LEGACY',
    headline: "Discover the World's Architectural Heritage",
    description: "Explore historic properties, ancient palazzos, and iconic architectural masterpieces across the globe preserved for generational wealth.",
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85', // Taj Mahal
    stats: { location: 'Agra / Florence / Kyoto', listingCount: '1,420 Heritage Sites', avgRoi: '8.4% Historic Appreciation' },
    highlights: ['UNESCO Heritage Proximity', 'Restoration Rights Included', 'Tax Exemptions Available']
  },
  {
    id: 'modern',
    category: 'Modern Architecture',
    badge: 'FUTURISTIC SKYLINES',
    headline: "Explore Modern Global Real Estate",
    description: "Experience the pinnacle of futuristic urban design, towering penthouses, and smart ultra-luxury skyscrapers defining world capitals.",
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85', // Dubai / Burj
    stats: { location: 'Dubai / Singapore / NYC', listingCount: '3,890 Penthouses', avgRoi: '12.1% Annualized Growth' },
    highlights: ['Helipad & Marina Access', 'AI Home Automation', 'Panoramic Horizon Views']
  },
  {
    id: 'luxury-residential',
    category: 'Luxury Residential',
    badge: 'PRIVATE SANCTUARIES',
    headline: "Find Your Dream Home Anywhere on Earth",
    description: "Discover extraordinary beachfront villas, private island sanctuaries, and cliffside estates in the world's most desirable locations.",
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85', // Luxury Villa
    stats: { location: 'Malibu / Monaco / Amalfi', listingCount: '2,150 Private Estates', avgRoi: '15.2% Luxury Index' },
    highlights: ['Private Beach Access', 'Infinity Pools & Spas', '24/7 Concierge & Security']
  },
  {
    id: 'commercial',
    category: 'Commercial Real Estate',
    badge: 'ENTERPRISE ASSETS',
    headline: "Invest in Global Commercial Opportunities",
    description: "Connect with prime office towers, innovation campuses, and high-yield retail districts anchored by Fortune 500 tenants.",
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85', // Commercial Skyscraper
    stats: { location: 'London / Tokyo / Frankfurt', listingCount: '870 Enterprise Districts', avgRoi: '9.8% Cap Rate' },
    highlights: ['Triple Net Leases (NNN)', 'ESG Certified Buildings', 'High Institutional Liquidity']
  },
  {
    id: 'agricultural',
    category: 'Agricultural Land',
    badge: 'SUSTAINABLE CAPITAL',
    headline: "Discover Agricultural Opportunities",
    description: "Explore productive farmlands, organic vineyards, and regenerative agricultural estates that yield food security and stable land appreciation.",
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85', // Farmland / Vineyard
    stats: { location: 'Bordeaux / Napa / Pampas', listingCount: '4,100 Organic Parcels', avgRoi: '11.0% Yield + Carbon Credits' },
    highlights: ['Water Rights & Aquifers', 'Carbon Offset Potential', 'Turnkey Vineyard Management']
  },
  {
    id: 'development',
    category: 'Development Land',
    badge: 'FUTURE EXPANSION',
    headline: "Shape the Future Through Land Investment",
    description: "Identify raw land parcels, economic growth corridors, and industrial logistics parks positioned directly in path-of-growth zones.",
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85', // Open expanse land
    stats: { location: 'Texas / Bangalore / Riyadh', listingCount: '12,500 Acres Mapped', avgRoi: '24.5% Projected IRR' },
    highlights: ['Zoning Pre-Approved', 'High-Speed Grid Access', 'Intermodal Transit Hubs']
  }
];

// Why EstateEarth Features
const FEATURES_DATA = [
  {
    icon: Globe,
    title: 'Global Property Marketplace',
    tag: 'WORLDWIDE COVERAGE',
    desc: 'Access verified real estate, land, and commercial assets across 192 countries in a unified institutional interface.'
  },
  {
    icon: Compass,
    title: 'Map-Based Discovery',
    tag: '3D GEOSPATIAL HUD',
    desc: 'Navigate satellite-backed spatial topographies, satellite layers, and orbital heatmaps to pinpoint prime micro-location value.'
  },
  {
    icon: Landmark,
    title: 'Local Market Intelligence',
    tag: 'AI-DRIVEN ANALYTICS',
    desc: 'Understand complex localized tax structures, regulatory cross-border ownership laws, and historical price velocity.'
  },
  {
    icon: Building2,
    title: 'Commercial & Investment',
    tag: 'INSTITUTIONAL GRADE',
    desc: 'Direct deal-flow access to off-market corporate towers, logistics centers, data centers, and multi-family portfolios.'
  },
  {
    icon: Users,
    title: 'Global Connections',
    tag: 'VERIFIED NETWORK',
    desc: 'Connect seamlessly with family offices, master architects, local notary attorneys, and certified luxury agents.'
  },
  {
    icon: Sparkles,
    title: 'Future-Ready Ecosystem',
    tag: 'BLOCKCHAIN & AI',
    desc: 'Powered by smart contracts, instant fractional ownership options, and space-grade satellite valuation models.'
  }
];

// World Map Hub Markers
const GLOBAL_MARKETS = [
  { id: 'usa', name: 'United States', region: 'North America', x: 24, y: 38, city: 'New York / Miami', yield: '7.8% Avg ROI', volume: '$4.2B Traded', activeListings: 14200, trend: '+14.2% YoY', status: 'High Liquidity' },
  { id: 'uk', name: 'United Kingdom', region: 'Europe', x: 46, y: 28, city: 'London Mayfair', yield: '6.4% Avg ROI', volume: '£2.8B Traded', activeListings: 8900, trend: '+8.1% YoY', status: 'Stable Reserve' },
  { id: 'uae', name: 'UAE', region: 'Middle East', x: 62, y: 44, city: 'Dubai Downtown', yield: '11.2% Avg ROI', volume: '$5.8B Traded', activeListings: 18400, trend: '+22.5% YoY', status: 'Booming Market' },
  { id: 'india', name: 'India', region: 'Asia-Pacific', x: 70, y: 48, city: 'Mumbai / Bengaluru', yield: '13.5% Avg ROI', volume: '₹45,000Cr Traded', activeListings: 32000, trend: '+18.9% YoY', status: 'Rapid Growth' },
  { id: 'singapore', name: 'Singapore', region: 'Asia-Pacific', x: 78, y: 58, city: 'Marina Bay Hub', yield: '5.9% Avg ROI', volume: '$1.9B Traded', activeListings: 4300, trend: '+6.2% YoY', status: 'Safe Haven' },
  { id: 'australia', name: 'Australia', region: 'Asia-Pacific', x: 86, y: 75, city: 'Sydney Harbour', yield: '7.1% Avg ROI', volume: 'A$2.1B Traded', activeListings: 6100, trend: '+9.4% YoY', status: 'High Demand' },
  { id: 'canada', name: 'Canada', region: 'North America', x: 22, y: 26, city: 'Toronto / Vancouver', yield: '6.2% Avg ROI', volume: 'C$1.8B Traded', activeListings: 5400, trend: '+5.8% YoY', status: 'Core Asset' },
  { id: 'japan', name: 'Japan', region: 'Asia-Pacific', x: 85, y: 38, city: 'Tokyo Ginza', yield: '5.4% Avg ROI', volume: '¥340B Traded', activeListings: 9100, trend: '+7.6% YoY', status: 'Ultra Low Rates' }
];

const EarthCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Group for Earth + Clouds
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180; // Earth Axial Tilt
    scene.add(earthGroup);

    // Procedural Earth Textures Creation via Canvas
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Ocean Background
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#041326');
      oceanGrad.addColorStop(0.5, '#072446');
      oceanGrad.addColorStop(1, '#020b18');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Procedural Continents Sketching
      ctx.fillStyle = '#0f3a5d';
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1;

      // Draw stylized continent shapes
      const seedPoints = [
        // North America
        [300, 250, 220], [450, 320, 180],
        // South America
        [520, 650, 160], [580, 800, 100],
        // Europe
        [1000, 260, 140], [1150, 300, 120],
        // Africa
        [1050, 500, 220], [1120, 680, 150],
        // Asia
        [1350, 250, 300], [1550, 350, 280], [1400, 480, 180],
        // Australia
        [1680, 720, 140]
      ];

      seedPoints.forEach(([x, y, r]) => {
        ctx.beginPath();
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const dist = r * (0.6 + Math.sin(i * 3 + x) * 0.4);
          const px = x + Math.cos(angle) * dist;
          const py = y + Math.sin(angle) * dist;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Add glowing golden property nodes on land
        for (let j = 0; j < 5; j++) {
          const nx = x + (Math.random() - 0.5) * r * 1.2;
          const ny = y + (Math.random() - 0.5) * r * 1.2;
          ctx.fillStyle = '#f3e5ab';
          ctx.beginPath();
          ctx.arc(nx, ny, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#0f3a5d';
      });

      // Grid lines (Lat/Long Lines like NASA/Maps)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      return new THREE.CanvasTexture(canvas);
    };

    // Earth Sphere Geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const earthTexture = createEarthTexture();
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 25,
      specular: new THREE.Color('#d4af37'),
      bumpScale: 0.05
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Atmosphere Outer Glow Sphere
    const atmosphereGeom = new THREE.SphereGeometry(1.18, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
          gl_FragColor = vec4(0.12, 0.52, 0.95, 1.0) * intensity * 1.2;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphere);

    // Satellite Orbit Ring Lines
    const ringGeom = new THREE.RingGeometry(1.35, 1.36, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    scene.add(ringMesh);

    // Starfield Particle Background
    const starsCount = 1200;
    const starsGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    starsGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.8 });
    const starField = new THREE.Points(starsGeom, starsMat);
    scene.add(starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x112233, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 2.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const blueFillLight = new THREE.DirectionalLight(0x0088ff, 1.2);
    blueFillLight.position.set(-5, -2, -3);
    scene.add(blueFillLight);

    // Mouse Drag Controls logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      earthGroup.rotation.y += deltaX * 0.005;
      earthGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    const domElem = currentMount;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        earthGroup.rotation.y += 0.002; // Slow natural Earth rotation
      }
      ringMesh.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full min-h-[420px] md:min-h-[600px]" />
      
      {/* HUD Telemetry Overlay */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto flex flex-wrap items-center gap-4 bg-[#071A2E]/80 backdrop-blur-md border border-[#D4AF37]/30 p-3 rounded-xl text-xs text-slate-300 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-mono uppercase tracking-wider">Orbit Active</span>
        </div>
        <div className="h-4 w-[1px] bg-white/20 hidden sm:block"></div>
        <div className="font-mono text-slate-400">LAT: 28.6139° N</div>
        <div className="font-mono text-slate-400">LNG: 77.2090° E</div>
        <div className="font-mono text-[#D4AF37]">ALT: 408.2 KM</div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(GLOBAL_MARKETS[0]);
  const [regionFilter, setRegionFilter] = useState('All');
  const [slideModalData, setSlideModalData] = useState(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'USD', symbol: '$', name: 'US Dollar' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Early Access Form State
  const [emailInput, setEmailInput] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [backerCount, setBackerCount] = useState(4820);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState({ location: '', category: 'All Categories', budget: 'Any Budget' });

  // Slideshow Auto Play Loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % SLIDES_DATA.length);
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Filtered Markets for Interactive Map
  const filteredMarkets = useMemo(() => {
    if (regionFilter === 'All') return GLOBAL_MARKETS;
    return GLOBAL_MARKETS.filter(m => m.region === regionFilter);
  }, [regionFilter]);

  const handleVipSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmittedEmail(true);
    setBackerCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#030C16] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 bg-[#030C16]/80 backdrop-blur-xl border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#071A2E] via-[#0F3A5D] to-[#D4AF37] p-[2px] shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#030C16] rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37]">
                ESTATEEARTH
              </span>
              <span className="text-[9px] tracking-[0.3em] text-slate-400 uppercase font-sans -mt-1">
                Global Real Estate
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300">
            <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Explore</a>
            <a href="#slideshow" className="hover:text-[#D4AF37] transition-colors">Portfolios</a>
            <a href="#why-us" className="hover:text-[#D4AF37] transition-colors">Why EstateEarth</a>
            <a href="#map" className="hover:text-[#D4AF37] transition-colors">Global Map</a>
            <a href="#vision" className="hover:text-[#D4AF37] transition-colors">Vision</a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsCurrencyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#D4AF37]/40 bg-white/5 text-xs text-slate-300 transition-all"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
            </button>

            <button 
              onClick={() => setIsVipModalOpen(true)}
              className="relative group px-5 py-2.5 rounded-full overflow-hidden text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] transition-all group-hover:scale-105"></div>
              <span className="relative z-10 text-slate-950 flex items-center gap-2">
                Get Early Access <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-sm font-medium text-slate-200">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37]">Explore</a>
            <a href="#slideshow" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37]">Portfolios</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37]">Why EstateEarth</a>
            <a href="#map" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37]">Global Map</a>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37]">Vision</a>
            <div className="pt-2 flex flex-col gap-3">
              <button 
                onClick={() => { setIsVipModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-slate-950 font-bold text-center"
              >
                Get Early Access
              </button>
            </div>
          </div>
        )}
      </nav>

      {}
      <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 flex flex-col justify-center overflow-hidden">
        
        {/* Background Ambient Stars & Gradient */}
        <div className="absolute inset-0 bg-radial from-[#072446]/40 via-[#030C16] to-[#030C16] -z-10"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-6 flex flex-col z-10">
            
            {/* NASA / NatGeo Style Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A2E]/80 border border-[#D4AF37]/40 w-fit mb-6 text-xs font-mono tracking-wider text-[#F3E5AB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>EARTH ORBITAL REAL ESTATE PLATFORM</span>
            </div>

            {/* Main Brand Name */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-none">
              ESTATE<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">EARTH</span>
            </h1>

            {/* Main Tagline */}
            <h2 className="text-2xl md:text-3xl font-light text-slate-200 mb-6 font-serif italic border-l-2 border-[#D4AF37] pl-4">
              "Own a Piece of Earth."
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Discover homes, historic landmarks, agricultural land, commercial properties, and strategic development opportunities across the globe. 
              <span className="block mt-2 font-medium text-white">Search the world. Explore local markets. Find your place on Earth.</span>
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a 
                href="#slideshow"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-slate-950 font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all flex items-center gap-2 group"
              >
                <span>Explore the World</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => setIsVipModalOpen(true)}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-sm tracking-wider uppercase backdrop-blur-md transition-all"
              >
                Coming Soon
              </button>
            </div>

            {/* Live Platform Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-lg">
              <div>
                <div className="text-xl md:text-2xl font-bold font-mono text-[#D4AF37]">1.4B+</div>
                <div className="text-xs text-slate-400">Acres Tracked</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold font-mono text-[#D4AF37]">192+</div>
                <div className="text-xs text-slate-400">Global Markets</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold font-mono text-[#D4AF37]">$85B+</div>
                <div className="text-xs text-slate-400">Dealflow Value</div>
              </div>
            </div>

          </div>

          {/* Right Column Interactive 3D Orbit Earth Canvas */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[600px] w-full flex items-center justify-center">
            <EarthCanvas />
          </div>

        </div>

        {/* Interactive Search Overlay Widget */}
        <div className="max-w-5xl mx-auto w-full mt-12 z-20">
          <div className="bg-[#071A2E]/90 border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Location Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Target Region / City
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Dubai, London, Kyoto" 
                  value={searchQuery.location}
                  onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Property Category */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Asset Class
                </label>
                <select 
                  value={searchQuery.category}
                  onChange={(e) => setSearchQuery({...searchQuery, category: e.target.value})}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Historic Architecture">Historic Architecture</option>
                  <option value="Modern Architecture">Modern Architecture</option>
                  <option value="Luxury Residential">Luxury Residential</option>
                  <option value="Commercial">Commercial Properties</option>
                  <option value="Agricultural">Agricultural Land</option>
                  <option value="Development Land">Open & Development Land</option>
                </select>
              </div>

              {/* Investment Scale */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Capital Scale
                </label>
                <select 
                  value={searchQuery.budget}
                  onChange={(e) => setSearchQuery({...searchQuery, budget: e.target.value})}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Any Budget">Any Budget Range</option>
                  <option value="$1M - $5M">$1M - $5M Private</option>
                  <option value="$5M - $25M">$5M - $25M Ultra Luxury</option>
                  <option value="$25M - $100M+">$25M - $100M+ Institutional</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button 
                  onClick={() => setIsMapModalOpen(true)}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
                >
                  <Search className="w-4 h-4" /> Search Globe
                </button>
              </div>

            </div>
          </div>
        </div>

      </section>

      {}
      <section id="slideshow" className="py-24 px-4 md:px-8 bg-[#020B14] relative overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-2 block">
            PROPERTY JOURNEY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Curated Global Asset Portfolios
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            From historic UNESCO sanctuaries to modern mega-structures, explore the diverse spectrum of Earth's finest real estate.
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          {/* Main Slide Frame */}
          <div className="relative h-[550px] md:h-[650px] w-full overflow-hidden">
            {SLIDES_DATA.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Ken Burns Animated HD Image */}
                  <img 
                    src={slide.image} 
                    alt={slide.headline}
                    className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                      isActive ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                    }`}
                  />

                  {/* Gradient Vignette Dark Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030C16] via-[#030C16]/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#030C16]/90 via-transparent to-transparent"></div>

                  {/* Slide Content Banner */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37] text-[10px] font-mono tracking-widest text-[#F3E5AB] uppercase mb-3">
                        {slide.badge}
                      </div>
                      <h3 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                        {slide.headline}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                        {slide.description}
                      </p>

                      {/* Highlights Pills */}
                      <div className="flex flex-wrap gap-2">
                        {slide.highlights.map((h, i) => (
                          <span key={i} className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-slate-200 border border-white/10 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" /> {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats & View Detail Button */}
                    <div className="bg-[#071A2E]/90 border border-white/10 p-5 rounded-2xl backdrop-blur-xl w-full md:w-auto min-w-[280px]">
                      <div className="text-xs font-mono text-[#D4AF37] uppercase mb-2">Market Snapshot</div>
                      <div className="text-sm font-semibold text-white mb-1">{slide.stats.location}</div>
                      <div className="text-xs text-slate-400 mb-3">{slide.stats.listingCount}</div>
                      <div className="text-xs font-mono text-emerald-400 mb-4">{slide.stats.avgRoi}</div>

                      <button 
                        onClick={() => setSlideModalData(slide)}
                        className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-slate-950 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Portfolio
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Slideshow Controls Bar */}
          <div className="bg-[#071A2E] border-t border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Slide Category Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {SLIDES_DATA.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSlide(idx); setIsPlaying(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    idx === activeSlide 
                      ? 'bg-[#D4AF37] text-slate-950 font-bold' 
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.category}
                </button>
              ))}
            </div>

            {/* Play/Pause & Arrow Navigation */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => { setActiveSlide((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length); setIsPlaying(false); }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-slate-400">
                0{activeSlide + 1} / 0{SLIDES_DATA.length}
              </span>

              <button 
                onClick={() => { setActiveSlide((prev) => (prev + 1) % SLIDES_DATA.length); setIsPlaying(false); }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="why-us" className="py-24 px-4 md:px-8 bg-[#030C16] relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-2 block">
              PLATFORM ADVANTAGE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Why EstateEarth
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Engineered for global investors, sovereign funds, luxury buyers, and forward-thinking developers.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-b from-[#071A2E] to-[#040E1B] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] overflow-hidden"
                >
                  {/* Subtle Corner Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-all"></div>

                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase mb-2">
                    {feat.tag}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[#F3E5AB] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {}
      <section id="map" className="py-24 px-4 md:px-8 bg-[#020B14] relative border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-2 block">
                GLOBAL MARKET DISCOVERY
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
                Explore Property Markets Across the Globe
              </h2>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'North America', 'Europe', 'Middle East', 'Asia-Pacific'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    regionFilter === reg 
                      ? 'bg-[#D4AF37] text-slate-950 font-bold' 
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive World Map Canvas Container */}
          <div className="relative w-full h-[500px] md:h-[600px] bg-[#041326] rounded-3xl border border-[#D4AF37]/30 overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* World Vector Blueprint Silhouette Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 500" fill="none">
              <path d="M150,120 Q200,80 300,100 T400,200 T300,350 T180,280 Z" fill="#0F3A5D" stroke="#D4AF37" strokeWidth="0.5"/>
              <path d="M450,100 Q550,80 650,150 T600,300 T500,400 Z" fill="#0F3A5D" stroke="#D4AF37" strokeWidth="0.5"/>
              <path d="M680,120 Q800,100 900,200 T850,380 T700,300 Z" fill="#0F3A5D" stroke="#D4AF37" strokeWidth="0.5"/>
              <path d="M800,380 Q880,360 920,420 T820,460 Z" fill="#0F3A5D" stroke="#D4AF37" strokeWidth="0.5"/>
            </svg>

            {/* Grid Lat/Long Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            {/* Glowing Market Pins */}
            {filteredMarkets.map((market) => {
              const isSelected = selectedMarket.id === market.id;
              return (
                <button
                  key={market.id}
                  onClick={() => setSelectedMarket(market)}
                  style={{ left: `${market.x}%`, top: `${market.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute w-8 h-8 rounded-full bg-[#D4AF37] opacity-40 animate-ping ${isSelected ? 'scale-150' : ''}`}></span>
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isSelected ? 'bg-white border-[#D4AF37] scale-125' : 'bg-[#D4AF37] border-slate-900 group-hover:scale-110'
                    }`}></div>
                  </div>
                  <span className="mt-1 block text-[10px] font-mono tracking-wider font-bold text-slate-200 bg-[#030C16]/90 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
                    {market.name}
                  </span>
                </button>
              );
            })}

            {/* Active Selected Market Intelligence HUD Overlay */}
            {selectedMarket && (
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-[#071A2E]/95 border border-[#D4AF37]/50 rounded-2xl p-6 backdrop-blur-2xl z-30 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{selectedMarket.region} HUB</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">{selectedMarket.status}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-1">{selectedMarket.name}</h3>
                <div className="text-xs text-slate-400 mb-4">{selectedMarket.city} Prime Sector</div>

                <div className="grid grid-cols-2 gap-3 mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                  <div>
                    <div className="text-[10px] text-slate-400">Yield Velocity</div>
                    <div className="text-sm font-bold font-mono text-[#D4AF37]">{selectedMarket.yield}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Annual Growth</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">{selectedMarket.trend}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Traded Volume</div>
                    <div className="text-sm font-bold font-mono text-slate-200">{selectedMarket.volume}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Active Listings</div>
                    <div className="text-sm font-bold font-mono text-slate-200">{selectedMarket.activeListings.toLocaleString()}</div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsMapModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:brightness-110"
                >
                  <Navigation className="w-3.5 h-3.5" /> Launch Market Radar
                </button>
              </div>
            )}

            {/* Map Action Button Top Right */}
            <div className="absolute top-6 right-6 hidden md:block">
              <button 
                onClick={() => setIsMapModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#071A2E]/90 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4" /> Explore Full Screen Map
              </button>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="vision" className="py-24 px-4 md:px-8 bg-[#030C16] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85" 
                alt="Earth Orbital View" 
                className="w-full h-[450px] md:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030C16] via-transparent to-transparent"></div>
              
              {/* Quote Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#071A2E]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <p className="font-serif italic text-slate-200 text-sm md:text-base mb-2">
                  "Land is the only thing in the world that amounts to anything, for it's the only thing in this world that lasts."
                </p>
                <span className="text-xs font-mono text-[#D4AF37]">— EstateEarth Vision Protocol</span>
              </div>
            </div>
          </div>

          {/* Right Column Vision Content */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-2 block">
              OUR MISSION & MANIFESTO
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Future of Property Discovery
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
              EstateEarth is building a completely new global infrastructure to discover, understand, and invest in real property across the planet. 
            </p>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              From historic UNESCO architecture and ultra-prime luxury residences to fertile agricultural acreage, commercial headquarters, and high-growth industrial land—EstateEarth connects people, capital, and possibilities across every continent with complete transparency and space-age intelligence.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Trust & Verification</h4>
                  <p className="text-xs text-slate-400">Institutional cross-border audit</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Real-Time Data</h4>
                  <p className="text-xs text-slate-400">Satellite telemetry telemetry</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#030C16] via-[#071A2E] to-[#030C16] relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>VIP EARLY ACCESS MEMBERSHIP</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
            Be Among the First to Explore EstateEarth
          </h2>

          <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Join our exclusive syndicate of global investors, private buyers, and real-estate innovators as we unveil the platform.
          </p>

          {/* Form */}
          <div className="max-w-xl mx-auto bg-[#071A2E]/90 p-2 rounded-full border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl mb-6">
            {!submittedEmail ? (
              <form onSubmit={handleVipSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-2 pl-4 w-full">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your private email address" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none py-2"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-slate-950 font-bold text-xs tracking-wider uppercase whitespace-nowrap hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="py-2 px-6 flex items-center justify-center gap-2 text-emerald-400 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>You are on the VIP priority whitelist. Access code sent shortly.</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{backerCount.toLocaleString()} Accredited Investors On Whitelist</span>
          </div>

        </div>
      </section>

      {}
      <footer className="bg-[#02070D] border-t border-white/10 pt-16 pb-12 px-4 md:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-slate-950 font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-serif tracking-[0.2em] text-lg font-bold text-white">
                ESTATEEARTH
              </span>
            </a>
            <p className="text-slate-400 text-sm max-w-sm">
              "Own a Piece of Earth." <br />
              The world's premier orbital real estate discovery and investment platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-white font-bold font-mono uppercase tracking-wider text-xs">Portfolios</span>
            <a href="#slideshow" className="hover:text-[#D4AF37] transition-colors">Historical</a>
            <a href="#slideshow" className="hover:text-[#D4AF37] transition-colors">Modern Skyscraper</a>
            <a href="#slideshow" className="hover:text-[#D4AF37] transition-colors">Luxury Residential</a>
            <a href="#slideshow" className="hover:text-[#D4AF37] transition-colors">Agricultural Farmland</a>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-white font-bold font-mono uppercase tracking-wider text-xs">Platform</span>
            <a href="#why-us" className="hover:text-[#D4AF37] transition-colors">Why EstateEarth</a>
            <a href="#map" className="hover:text-[#D4AF37] transition-colors">Global Map Radar</a>
            <a href="#vision" className="hover:text-[#D4AF37] transition-colors">Mission Vision</a>
            <a href="#" onClick={() => setIsVipModalOpen(true)} className="hover:text-[#D4AF37] transition-colors">VIP Whitelist</a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-white font-bold font-mono uppercase tracking-wider text-xs">Legal & Compliance</span>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Global Service</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Institutional Accreditation</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Cross-Border Compliance</a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>© {new Date().getFullYear()} EstateEarth Inc. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <span>NASA Telemetry Verified</span>
            <span>•</span>
            <span>Global Real Estate Protocol</span>
          </div>
        </div>
      </footer>

      {}
      
      {/* Portfolio Detail Slide Modal */}
      {slideModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#071A2E] border border-[#D4AF37]/40 rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => setSlideModalData(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">{slideModalData.badge}</span>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">{slideModalData.headline}</h3>
            
            <img src={slideModalData.image} alt={slideModalData.headline} className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10" />

            <p className="text-slate-300 text-sm leading-relaxed mb-6">{slideModalData.description}</p>

            <div className="bg-black/40 p-4 rounded-xl border border-white/10 mb-6 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Top Markets</span>
                <span className="text-white font-bold">{slideModalData.stats.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Appreciation Metric</span>
                <span className="text-emerald-400 font-bold">{slideModalData.stats.avgRoi}</span>
              </div>
            </div>

            <button 
              onClick={() => { setSlideModalData(null); setIsVipModalOpen(true); }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Request Private Offering Memorandum
            </button>
          </div>
        </div>
      )}

      {/* VIP Access Modal */}
      {isVipModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#071A2E] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 md:p-8 relative shadow-2xl text-center">
            <button 
              onClick={() => setIsVipModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <Globe className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Join the Whitelist</h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              Get immediate priority deal access when EstateEarth goes live globally.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setIsVipModalOpen(false); alert("You've been registered for priority access."); }}>
              <input 
                type="email" 
                required 
                placeholder="Enter work email" 
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm text-white mb-4 focus:outline-none focus:border-[#D4AF37]"
              />
              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Confirm Priority Access
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Map Full Radar Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#041326] border border-[#D4AF37]/50 rounded-3xl max-w-5xl w-full h-[85vh] p-6 relative flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">EstateEarth Orbit Radar</h3>
                <span className="text-xs font-mono text-[#D4AF37]">Global Geospatial Market Intelligence</span>
              </div>
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 overflow-y-auto max-h-[60vh] p-2">
              {GLOBAL_MARKETS.map(m => (
                <div key={m.id} className="bg-[#071A2E] p-4 rounded-xl border border-white/10 hover:border-[#D4AF37]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white text-sm">{m.name}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">{m.yield}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{m.city}</div>
                  <div className="text-xs text-slate-300 font-mono">Listings: {m.activeListings.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsMapModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Close Radar View
            </button>
          </div>
        </div>
      )}

      {/* Currency Selector Modal */}
      {isCurrencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#071A2E] border border-white/20 rounded-2xl max-w-sm w-full p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-serif font-bold text-white">Select Base Currency</h4>
              <button onClick={() => setIsCurrencyModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { code: 'USD', symbol: '$', name: 'US Dollar' },
                { code: 'EUR', symbol: '€', name: 'Euro' },
                { code: 'GBP', symbol: '£', name: 'British Pound' },
                { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
                { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
                { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }
              ].map(c => (
                <button 
                  key={c.code}
                  onClick={() => { setSelectedCurrency(c); setIsCurrencyModalOpen(false); }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 text-left text-xs font-mono"
                >
                  <span className="text-white">{c.name} ({c.code})</span>
                  <span className="text-[#D4AF37] font-bold">{c.symbol}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
