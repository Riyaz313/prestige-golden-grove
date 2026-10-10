import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Expand,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'
import './App.css'

const asset = (filename: string) => `/assets/${filename}`

const gallery = [
  { src: 'golden-grove-residential-exterior-render-a.jpg', title: 'A township in harmony', tag: 'Architecture' },
  { src: 'golden-grove-entrance-night-view.jpg', title: 'A considered arrival', tag: 'Arrival' },
  { src: 'golden-grove-clubhouse-evening-courtyard.jpg', title: 'The clubhouse courtyard', tag: 'Clubhouse' },
  { src: 'golden-grove-pool-and-clubhouse-aerial.jpg', title: 'Leisure by the water', tag: 'Leisure' },
  { src: 'golden-grove-sports-court-podium-aerial.jpg', title: 'Room to move', tag: 'Wellness' },
  { src: 'golden-grove-residential-tower-aerial.jpg', title: 'A wider view of home', tag: 'Architecture' },
  { src: 'golden-grove-clubhouse-rooftop-aerial.jpg', title: 'An elevated retreat', tag: 'Clubhouse' },
  { src: 'golden-grove-tower-balcony-evening.jpg', title: 'Light, space and sky', tag: 'Residences' },
]

const amenityImages = [
  { src: 'golden-grove-pool-and-clubhouse-aerial.jpg', title: 'Indoor pool & jacuzzi', group: 'Wellness' },
  { src: 'golden-grove-clubhouse-evening-courtyard.jpg', title: 'Clubhouse Sapphire', group: 'Gather' },
  { src: 'golden-grove-sports-court-podium-aerial.jpg', title: 'Courts & active living', group: 'Move' },
  { src: 'golden-grove-garden-walkway-and-podium.jpg', title: 'Landscaped gardens', group: 'Restore' },
  { src: 'golden-grove-rooftop-leisure-deck-aerial.jpg', title: 'Rooftop leisure', group: 'Gather' },
  { src: 'golden-grove-clubhouse-pool-evening.jpg', title: 'Poolside evenings', group: 'Wellness' },
]

const apartmentPlans = Array.from({ length: 27 }, (_, index) => {
  const page = index + 72
  return {
    page,
    src: `golden-grove-apartment-floor-plan-page-${page}.png`,
    collection: page <= 84 ? '72–84' : '85–98',
  }
})

const clusterPlans = Array.from({ length: 44 }, (_, index) => {
  const page = index + 27
  return { page, src: `golden-grove-cluster-plan-page-${page}.png` }
})

const configurations = [
  ['2 BED Classic', '2B2T'],
  ['3 BED Aspire', '3B2T'],
  ['3 BED Premia', '3B3T'],
  ['3 BED Ultima', '3B3T + Study'],
  ['4 BED Supreme', '4B4T'],
  ['4 BED Ultima', '4B4T + Staff'],
]

const amenities = [
  'Indoor swimming pool with jacuzzi', 'Hobby room', 'Yoga & Pilates rooms', 'Toddler play area', 'His & Her spa',
  'Gym & aerobics studios', 'Billiards room', 'Table tennis', 'Squash court', 'Library room',
  'Badminton courts', 'Pickleball courts', 'Indoor game room', 'Salon',
]

const connectivity = [
  ['2–3 min', 'ORR Exit 2 & Exit 3'],
  ['10–15 min', 'Financial District, Gachibowli & HITEC City'],
  ['20 min', 'Lingampally MMTS'],
  ['30–35 min', 'Rajiv Gandhi International Airport'],
]

const specifications = [
  ['Structure', 'RCC structure in shear-wall technology.'],
  ['Apartment flooring', 'Vitrified tiles in foyer, living, dining, corridors, bedrooms, kitchen and utility; ceramic tiles on balconies.'],
  ['Kitchen', 'Ceramic tile dado above the designated counter length; RO/IG points.'],
  ['Doors & windows', 'Timber or wooden frames with laminated flush shutters; UPVC framed windows with clear glass.'],
  ['Electrical', 'Concealed PVC-insulated copper wiring with modular switches; ELCB and individual apartment meters.'],
  ['Security', 'Security cabins at entrances and exits with CCTV coverage.'],
]

const questions = [
  ['Where is Prestige Golden Grove located?', 'The brochure presents the project as connected to Hyderabad’s IT corridor. It lists ORR Exits 2 and 3, Financial District, Gachibowli, HITEC City, Lingampally MMTS and Rajiv Gandhi International Airport. Use the location map for the brochure’s illustrated context.'],
  ['What apartment configurations are shown?', 'The brochure lists 2 BED Classic, 3 BED Aspire, 3 BED Premia, 3 BED Ultima, 4 BED Supreme and 4 BED Ultima. Stated home sizes range from 1,169 to 3,013 sq. ft.'],
  ['Can I see the floor plans?', 'Yes. The apartment explorer includes all 27 brochure floor-plan crops. Select a plan to open the complete diagram at a larger size. Cluster-plan sheets and master plans are available in the plans section.'],
  ['What offer is shown in the campaign artwork?', 'The supplied campaign artwork describes a 3-year Pre-EMI plan: 10% initially, another 10% within 45 days of agreement signing, and an 80% loan. It states no EMI for three years, with Prestige paying the EMI, and shows validity from 10 October to 31 December 2026. Eligibility, lender approval and full terms must be confirmed with the project team.'],
  ['Does the enquiry form contact Prestige?', 'Submitting opens WhatsApp with your enquiry pre-filled for the project contact. You must tap Send in WhatsApp to send it. This website cannot confirm whether the message was delivered.'],
]

type Preview = { src: string; alt: string } | null

type EnquiryFormProps = {
  formStatus: string
  whatsappUrl: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onReset: () => void
  idPrefix: string
  className?: string
}

function EnquiryForm({ formStatus, whatsappUrl, onSubmit, onReset, idPrefix, className = '' }: EnquiryFormProps) {
  const fieldId = (name: string) => `${idPrefix}-${name}`

  return (
    <form className={`enquiry-form ${className}`.trim()} onSubmit={onSubmit}>
      {!whatsappUrl ? <>
        <div className="form-heading"><span className="eyebrow light-eyebrow"><span /> Get in touch</span><h3>Request a private callback</h3><p>Complete the form to prepare a WhatsApp enquiry for the project contact.</p></div>
        <div className="form-fields">
          <label htmlFor={fieldId('full-name')}><span className="sr-only">Full name</span><input id={fieldId('full-name')} name="name" type="text" autoComplete="name" placeholder="Full name *" required minLength={2} /></label>
          <label htmlFor={fieldId('phone')}><span className="sr-only">Phone number</span><input id={fieldId('phone')} name="phone" type="tel" autoComplete="tel" placeholder="Phone number *" required pattern="[0-9]{8,15}" /></label>
          <label htmlFor={fieldId('email')}><span className="sr-only">Email address</span><input id={fieldId('email')} name="email" type="email" autoComplete="email" placeholder="Email address *" required /></label>
          <label htmlFor={fieldId('interest')}><span className="sr-only">Configuration of interest</span><select id={fieldId('interest')} name="interest" defaultValue="" required><option value="" disabled>Configuration of interest *</option>{configurations.map(([name]) => <option key={name}>{name}</option>)}<option>General project information</option></select></label>
          <label className="form-message" htmlFor={fieldId('preferred-time')}><span className="sr-only">Message or preferred time, optional</span><input id={fieldId('preferred-time')} name="preferredTime" type="text" placeholder="Message / preferred time (optional)" /></label>
        </div>
        <button className="button button-gold form-submit" type="submit">Submit enquiry <Send size={16} /></button>
      </> : <div className="thank-you-card" role="status">
        <span className="thank-you-icon"><CircleCheck size={28} /></span>
        <h3>Thank you</h3>
        <p>{formStatus}</p>
        <a className="thank-you-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp message <ArrowRight size={15} /></a>
        <button className="another-enquiry" type="button" onClick={onReset}>Submit another enquiry</button>
      </div>}
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(apartmentPlans[0])
  const [planFilter, setPlanFilter] = useState('all')
  const [selectedCluster, setSelectedCluster] = useState({ page: 23, src: 'golden-grove-outdoor-amenities-master-plan.png' })
  const [preview, setPreview] = useState<Preview>(null)
  const [launchPopupOpen, setLaunchPopupOpen] = useState(true)
  const [enquiryPopupOpen, setEnquiryPopupOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [propertyValue, setPropertyValue] = useState(0)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanYears, setLoanYears] = useState(20)
  const [formStatus, setFormStatus] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [galleryMotion, setGalleryMotion] = useState(false)

  const filteredPlans = planFilter === 'all'
    ? apartmentPlans
    : apartmentPlans.filter((plan) => plan.collection === planFilter)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreview(null)
        setLaunchPopupOpen(false)
        setEnquiryPopupOpen(false)
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.toggle('modal-open', Boolean(preview || launchPopupOpen || enquiryPopupOpen))
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [preview, launchPopupOpen, enquiryPopupOpen])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  const moveGallery = (direction: number) => {
    setGalleryMotion(true)
    setGalleryIndex((current) => (current + direction + gallery.length) % gallery.length)
    window.setTimeout(() => setGalleryMotion(false), 380)
  }

  const monthlyPayment = () => {
    const principal = propertyValue * (1 - downPayment / 100)
    const monthlyRate = interestRate / 1200
    const payments = loanYears * 12
    if (principal <= 0 || payments <= 0) return 0
    if (monthlyRate <= 0) return principal / payments
    return principal * monthlyRate * (1 + monthlyRate) ** payments / ((1 + monthlyRate) ** payments - 1)
  }

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      'Hello, I am interested in Prestige Golden Grove.',
      '',
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone')}`,
      `Interested in: ${formData.get('interest')}`,
      formData.get('preferredTime') ? `Message / preferred time: ${formData.get('preferredTime')}` : '',
    ].filter(Boolean).join('\n')
    const chatUrl = new URL('https://wa.me/916281245149')
    chatUrl.searchParams.set('text', message)
    setWhatsappUrl(chatUrl.toString())
    setFormStatus('Thank you for your enquiry. Your message is ready in WhatsApp. Tap Send there to submit it; this website cannot verify whether it was sent.')
    window.open(chatUrl.toString(), '_blank', 'noopener,noreferrer')
  }

  const startAnotherEnquiry = () => {
    setWhatsappUrl('')
    setFormStatus('')
  }

  const openEnquiryPopup = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    startAnotherEnquiry()
    setEnquiryPopupOpen(true)
    setMenuOpen(false)
  }

  const selectPlan = (plan: typeof apartmentPlans[number]) => setSelectedPlan(plan)
  const changePlanFilter = (value: string) => {
    setPlanFilter(value)
    const firstPlan = value === 'all' ? apartmentPlans[0] : apartmentPlans.find((plan) => plan.collection === value)
    if (firstPlan) setSelectedPlan(firstPlan)
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Prestige Golden Grove home">
          <img className="brand-mark" src="/logo.svg" alt="Prestige Golden Grove" />
          <span className="brand-copy"><span className="brand-kicker">PRESTIGE</span><span className="brand-title">Golden Grove</span></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {[
            ['story', 'The township'], ['gallery', 'Gallery'], ['residences', 'Residences'],
            ['amenities', 'Amenities'], ['location', 'Location'],
          ].map(([href, label]) => <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#enquire" onClick={openEnquiryPopup}>Enquire <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={asset('golden-grove-residential-exterior-render-a.jpg')} alt="Prestige Golden Grove residential towers in a landscaped setting" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="eyebrow light-eyebrow"><span /> A township in harmony</span>
            <h1>Where life<br /><em>finds its green.</em></h1>
            <p>Ten towers. A generous green heart. A considered way to come home.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#enquire" onClick={openEnquiryPopup}>Download brochure <ArrowRight size={16} /></a>
              <a className="button hero-call-button" href="#enquire" onClick={openEnquiryPopup}>Request a call <Phone size={16} /></a>
            </div>
          </div>
          <div className="hero-index"><span>HYDERABAD</span><i /> <span>01 / 08</span></div>
          <div className="hero-caption"><span>PROJECT RENDER</span><span>Prestige Golden Grove</span></div>
        </section>

        <section className="facts-strip" aria-label="Project facts from the brochure">
          <div><span>LAND PARCEL</span><strong>28.6 <small>acres</small></strong></div>
          <div><span>RESIDENTIAL TOWERS</span><strong>10</strong></div>
          <div><span>HOME CONFIGURATIONS</span><strong>2, 3 & 4 <small>bedroom</small></strong></div>
          <div><span>HOME SIZES</span><strong>1,169–3,013 <small>sq. ft.</small></strong></div>
        </section>

        <section className="story section-pad" id="story">
          <div className="story-image-wrap reveal">
            <img src={asset('golden-grove-family-illustration.png')} alt="Illustration of a family enjoying a green landscape" loading="lazy" />
            <span className="image-note">A township designed around nature</span>
          </div>
          <div className="story-copy reveal">
            <span className="eyebrow"><span /> The township</span>
            <h2>A little more<br />room to <em>belong.</em></h2>
            <p className="lead">Spread across 28.6 acres, Golden Grove is imagined as a self-sustaining community, with ten towers creating a generous green heart at the centre.</p>
            <p>Thoughtful planning brings open landscapes, natural light and cross ventilation into the everyday rhythm of home.</p>
            <a className="underlined-link" href="#masterplan">Explore the master plan <ArrowRight size={16} /></a>
            <div className="story-mark">28.6 <span>acres of thoughtful planning</span></div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> A closer look</span><h2>Spaces made<br /><em>to be lived in.</em></h2></div>
            <p>Architecture, landscape and shared spaces, brought together in a collection of project views.</p>
          </div>
          <div className="gallery-feature reveal">
            <button className={`gallery-main ${galleryMotion ? 'is-changing' : ''}`} type="button" onClick={() => setPreview({ src: gallery[galleryIndex].src, alt: gallery[galleryIndex].title })} aria-label={`Enlarge ${gallery[galleryIndex].title}`}>
              <img src={asset(gallery[galleryIndex].src)} alt={gallery[galleryIndex].title} loading="lazy" />
              <span className="gallery-number">0{galleryIndex + 1} <i /> 0{gallery.length}</span>
              <span className="gallery-title"><small>{gallery[galleryIndex].tag}</small>{gallery[galleryIndex].title}</span>
              <span className="expand-control"><Expand size={18} /></span>
            </button>
            <div className="gallery-controls">
              <div><span className="eyebrow"><span /> {gallery[galleryIndex].tag}</span><p>{gallery[galleryIndex].title}</p></div>
              <div className="arrow-controls">
                <button type="button" aria-label="Previous gallery image" onClick={() => moveGallery(-1)}><ArrowLeft size={18} /></button>
                <button type="button" aria-label="Next gallery image" onClick={() => moveGallery(1)}><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
          <div className="gallery-thumbnails reveal" aria-label="Choose a gallery image">
            {gallery.map((image, index) => <button type="button" key={image.src} className={galleryIndex === index ? 'is-active' : ''} aria-label={`Show ${image.title}`} onClick={() => setGalleryIndex(index)}><img src={asset(image.src)} alt="" loading="lazy" /></button>)}
          </div>
        </section>

        <section className="residences section-pad" id="residences">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> Find your fit</span><h2>Room for every<br /><em>kind of together.</em></h2></div>
            <p>Configurations and area range as described in the project brochure. Confirm current plans and details directly with the project team.</p>
          </div>
          <div className="config-grid reveal">
            {configurations.map(([name, shorthand], index) => <article className="config-item" key={name}>
              <span className="config-number">0{index + 1}</span><h3>{name}</h3><span className="config-shorthand">{shorthand}</span>
            </article>)}
          </div>
          <div className="area-band reveal"><span>Stated home sizes</span><strong>1,169 <i>—</i> 3,013 <small>sq. ft.</small></strong><span>Natural light · Cross ventilation · Vaastu-compliant layouts</span></div>
        </section>

        <section className="floorplans section-pad" id="floorplans">
          <div className="section-heading reveal">
            <div><span className="eyebrow light-eyebrow"><span /> A plan for living</span><h2>Find your<br /><em>point of view.</em></h2></div>
            <p>Browse all 27 apartment plan sheets. Choose a brochure page to view the complete apartment layout, including its labels and orientation.</p>
          </div>
          <div className="plan-explorer reveal">
            <div className="plan-sidebar">
              <label htmlFor="plan-collection" className="eyebrow light-eyebrow">BROWSE PLAN SHEETS</label>
              <div className="select-wrap"><select id="plan-collection" value={planFilter} onChange={(event) => changePlanFilter(event.target.value)}>
                <option value="all">All apartment plans · 27</option>
                <option value="72–84">Brochure pages 72–84 · 13</option>
                <option value="85–98">Brochure pages 85–98 · 14</option>
              </select><ChevronDown size={16} /></div>
              <div className="plan-list" role="listbox" aria-label="Apartment floor plans">
                {filteredPlans.map((plan) => <button type="button" role="option" aria-selected={selectedPlan.page === plan.page} className={selectedPlan.page === plan.page ? 'is-selected' : ''} key={plan.page} onClick={() => selectPlan(plan)}><span>PLAN</span><strong>{String(plan.page - 71).padStart(2, '0')}</strong><small>Brochure p. {plan.page}</small><ChevronRight size={15} /></button>)}
              </div>
              <p className="plan-caveat">The brochure pages are shown as complete diagrams. Verify dimensions and configuration with the project team.</p>
            </div>
            <div className="plan-display">
              <div className="plan-display-top"><span>APARTMENT PLAN <i /> PAGE {selectedPlan.page}</span><button type="button" aria-label="Enlarge selected apartment plan" onClick={() => setPreview({ src: selectedPlan.src, alt: `Complete apartment floor plan from brochure page ${selectedPlan.page}` })}><Expand size={17} /> Enlarge</button></div>
              <button type="button" className="plan-image-button" onClick={() => setPreview({ src: selectedPlan.src, alt: `Complete apartment floor plan from brochure page ${selectedPlan.page}` })} aria-label="Open full apartment plan">
                <img src={asset(selectedPlan.src)} alt={`Complete apartment floor plan from brochure page ${selectedPlan.page}`} loading="lazy" />
              </button>
              <div className="plan-display-bottom"><span>Prestige Golden Grove · Apartment collection</span><span>Tap image to expand <Expand size={13} /></span></div>
            </div>
          </div>
        </section>

        <section className="masterplan section-pad" id="masterplan">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> Planned as a whole</span><h2>The larger<br /><em>picture.</em></h2></div>
            <p>Explore the township, outdoor amenities and tower cluster sheets exactly as illustrated in the brochure.</p>
          </div>
          <div className="master-tabs reveal" role="tablist" aria-label="Master plan selection">
            <button type="button" role="tab" aria-selected={selectedCluster.page === 23} onClick={() => setSelectedCluster({ page: 23, src: 'golden-grove-outdoor-amenities-master-plan.png' })}>Outdoor amenities</button>
            <button type="button" role="tab" aria-selected={selectedCluster.page === 25} onClick={() => setSelectedCluster({ page: 25, src: 'golden-grove-master-numbering-plan.png' })}>Tower numbering</button>
            <button type="button" role="tab" aria-selected={selectedCluster.page >= 27} onClick={() => setSelectedCluster(clusterPlans[0])}>Cluster plans</button>
          </div>
          <div className="master-viewer reveal">
            <div className="master-viewer-image">
              <button type="button" onClick={() => setPreview({ src: selectedCluster.src, alt: selectedCluster.page === 23 ? 'Outdoor amenities master plan' : selectedCluster.page === 25 ? 'Tower numbering master plan' : `Complete tower cluster plan from brochure page ${selectedCluster.page}` })} aria-label="Enlarge selected master plan">
                <img src={asset(selectedCluster.src)} alt={selectedCluster.page === 23 ? 'Outdoor amenities master plan' : selectedCluster.page === 25 ? 'Tower numbering master plan' : `Complete tower cluster plan from brochure page ${selectedCluster.page}`} loading="lazy" />
              </button>
              <button className="master-enlarge" type="button" aria-label="Expand master plan" onClick={() => setPreview({ src: selectedCluster.src, alt: `Complete master plan from brochure page ${selectedCluster.page}` })}><Expand size={18} /></button>
            </div>
            <div className="master-viewer-info">
              <span className="eyebrow"><span /> BROCHURE PAGE {selectedCluster.page}</span>
              <h3>{selectedCluster.page === 23 ? 'Outdoor amenities' : selectedCluster.page === 25 ? 'Tower numbering plan' : 'Cluster plan for a typical floor'}</h3>
              <p>Selected directly from the supplied Prestige Golden Grove brochure. Enlarge to inspect the complete original diagram.</p>
              {selectedCluster.page >= 27 && <div className="cluster-select"><label htmlFor="cluster-plan">Choose a cluster sheet</label><select id="cluster-plan" value={selectedCluster.page} onChange={(event) => setSelectedCluster(clusterPlans[Number(event.target.value) - 27])}>{clusterPlans.map((plan) => <option key={plan.page} value={plan.page}>Brochure page {plan.page}</option>)}</select><ChevronDown size={15} /></div>}
              <a className="underlined-link" href="#enquire" onClick={openEnquiryPopup}>Ask about the plans <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="amenities section-pad" id="amenities">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> The everyday, elevated</span><h2>A life with<br /><em>more in it.</em></h2></div>
            <p>Clubhouse Sapphire brings together recreation, wellbeing and places to gather, as described in the brochure.</p>
          </div>
          <div className="amenity-gallery reveal">
            {amenityImages.map((image, index) => <button type="button" className={`amenity-card amenity-card-${index + 1}`} key={image.src} onClick={() => setPreview({ src: image.src, alt: image.title })}>
              <img src={asset(image.src)} alt={image.title} loading="lazy" /><span className="amenity-card-text"><small>{image.group}</small><strong>{image.title}</strong></span><span className="amenity-card-arrow"><ArrowUpRight size={17} /></span>
            </button>)}
          </div>
          <div className="amenity-list reveal"><span className="eyebrow"><span /> BROCHURE-LISTED FACILITIES</span><div>{amenities.map((amenity) => <span key={amenity}><Check size={13} />{amenity}</span>)}</div></div>
        </section>

        <section className="location section-pad" id="location">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> Connected to the city</span><h2>Close to what<br /><em>moves you.</em></h2></div>
            <p>Travel times below are brochure estimates and can vary with route and traffic. The map is an illustration, not a navigation map.</p>
          </div>
          <div className="location-layout reveal">
            <button type="button" className="location-map" aria-label="Enlarge brochure location map" onClick={() => setPreview({ src: 'golden-grove-location-map.png', alt: 'Illustrated location map from the Prestige Golden Grove brochure' })}>
              <img src={asset('golden-grove-location-map.png')} alt="Illustrated Prestige Golden Grove location map" loading="lazy" /><span><MapPin size={15} /> VIEW MAP <Expand size={14} /></span>
            </button>
            <div className="connectivity-list">{connectivity.map(([time, destination], index) => <div className="connectivity-row" key={destination}><span className="connectivity-number">0{index + 1}</span><strong>{time}</strong><span>{destination}</span><ArrowUpRight size={16} /></div>)}<p className="source-note">Source: Prestige Golden Grove brochure, pages 16–18. Travel times are indicative brochure statements, not live estimates.</p></div>
          </div>
        </section>

        <section className="specifications section-pad" id="specifications">
          <div className="section-heading reveal">
            <div><span className="eyebrow light-eyebrow"><span /> The considered details</span><h2>Made for<br /><em>everyday life.</em></h2></div>
            <p>Selected construction and finish details transcribed from the brochure specification page.</p>
          </div>
          <div className="spec-grid reveal">{specifications.map(([title, detail], index) => <article className="spec-item" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div><Plus size={16} /></article>)}</div>
          <p className="spec-note">Specifications are brochure-stated and subject to the project’s applicable documentation.</p>
        </section>

        <section className="offer section-pad" id="offer">
          <div className="offer-heading reveal">
            <span className="eyebrow light-eyebrow"><span /> A limited-period plan</span>
            <h2>Pre-EMI plan<br /><em>for a more considered start.</em></h2>
            <p>A 3-year payment plan shown in the supplied Prestige Golden Grove campaign artwork.</p>
          </div>
          <div className="offer-feature reveal">
            <div className="offer-visual">
              <img src={asset('golden-grove-residential-exterior-render-b.jpg')} alt="Prestige Golden Grove towers and landscaped community" loading="lazy" />
              <span className="offer-visual-shade" />
              <span className="offer-visual-label">PRESTIGE GOLDEN GROVE <i /> TELLAPUR</span>
              <div className="offer-visual-callout"><small>3-YEAR PLAN</small><strong>No EMI<br />for 3 years</strong><span>EMI paid by Prestige, as stated in the campaign</span></div>
            </div>
            <div className="offer-terms">
              <div className="offer-terms-heading"><span>THE PAYMENT PLAN</span><span>AS SHOWN IN CAMPAIGN</span></div>
              <article className="offer-step"><span className="offer-step-number">01</span><strong>10%</strong><p>Customer pays initially</p></article>
              <article className="offer-step"><span className="offer-step-number">02</span><strong>10%</strong><p>Another 10% within 45 days of agreement signing</p></article>
              <article className="offer-step"><span className="offer-step-number">03</span><strong>80%</strong><p>Loan, subject to lender approval</p></article>
              <div className="offer-summary"><span>NO EMI</span><strong>Until November 2029</strong><small>Campaign also describes this as a 3-year plan, with EMI paid by Prestige.</small></div>
            </div>
          </div>
          <div className="offer-footer reveal">
            <div><span className="offer-footer-label">OFFER VALIDITY SHOWN</span><strong>10 October – 31 December 2026</strong></div>
            <div><span className="offer-footer-label">BANKS SHOWN IN CAMPAIGN</span><strong>Axis Bank · ICICI Bank · Bajaj</strong></div>
            <a className="button button-gold" href="#enquire" onClick={openEnquiryPopup}>Ask about this plan <ArrowRight size={16} /></a>
          </div>
          <p className="offer-disclaimer">Offer details are transcribed from the supplied campaign artwork, not independently verified. Eligibility, lender approval, applicable conditions and complete terms may apply; confirm details with the project team. The artwork states no EMI until November 2029 and also describes a 3-year plan.</p>
        </section>

        <section className="calculator section-pad" id="calculator">
          <div className="section-heading reveal">
            <div><span className="eyebrow"><span /> Your numbers, your assumptions</span><h2>A simple<br /><em>monthly estimate.</em></h2></div>
            <p>Illustrative loan payment only. Enter an assumed property value to explore a possible principal-and-interest payment; no project price is supplied.</p>
          </div>
          <div className="calculator-panel reveal">
            <div className="calculator-inputs">
              <label>Assumed property value <span className="money-input"><span>₹</span><input type="number" min="0" step="100000" value={propertyValue || ''} placeholder="Enter amount" onChange={(event) => setPropertyValue(Number(event.target.value))} /></span></label>
              <label>Down payment <strong>{downPayment}%</strong><input type="range" min="0" max="80" step="5" value={downPayment} onChange={(event) => setDownPayment(Number(event.target.value))} /></label>
              <label>Assumed annual interest <strong>{interestRate.toFixed(1)}%</strong><input type="range" min="0" max="18" step="0.1" value={interestRate} onChange={(event) => setInterestRate(Number(event.target.value))} /></label>
              <label>Loan term <strong>{loanYears} years</strong><input type="range" min="1" max="30" step="1" value={loanYears} onChange={(event) => setLoanYears(Number(event.target.value))} /></label>
            </div>
            <div className="calculator-result"><span className="eyebrow light-eyebrow"><span /> ILLUSTRATIVE MONTHLY PAYMENT</span><strong>₹{Math.round(monthlyPayment()).toLocaleString('en-IN')}</strong><p>Estimated EMI on a {100 - downPayment}% loan, at {interestRate.toFixed(1)}% annual interest for {loanYears} years.</p><small>For illustration only. Excludes taxes, insurance, fees and lender-specific terms. Not an offer, quote or financial advice.</small></div>
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="section-heading reveal"><div><span className="eyebrow"><span /> A few useful answers</span><h2>Before you<br /><em>come by.</em></h2></div><p>Answers drawn from the supplied brochure and the functionality of this page.</p></div>
          <div className="faq-list reveal">{questions.map(([question, answer], index) => <article className={expandedFaq === index ? 'faq-item is-open' : 'faq-item'} key={question}><button type="button" aria-expanded={expandedFaq === index} onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong>{expandedFaq === index ? <Minus size={19} /> : <Plus size={19} />}</button>{expandedFaq === index && <p>{answer}</p>}</article>)}</div>
        </section>

        <section className="enquiry section-pad" id="enquire">
          <div className="enquiry-copy reveal">
            <span className="eyebrow light-eyebrow"><span /> Prestige Golden Grove</span>
            <h2>Your new beginning<br />starts <em>here.</em></h2>
            <p>Connect with the project contact to ask about residences, floor plans, and the details that matter to you.</p>
            <div className="enquiry-contact">
              <span className="contact-icon"><Phone size={19} /></span>
              <span><small>CALL OR WHATSAPP</small><a href="tel:+916281245149">+91 62812 45149</a></span>
            </div>
            <div className="enquiry-contact">
              <span className="contact-icon"><Mail size={19} /></span>
              <span><small>EMAIL ENQUIRIES</small><a href="mailto:ravindra@hyderabadpropertyconsultants.com">ravindra@hyderabadpropertyconsultants.com</a></span>
            </div>
            <div className="rera-registration"><ShieldCheck size={18} /><span>TS RERA REG. NO: P02400007890</span></div>
          </div>
          <EnquiryForm formStatus={formStatus} whatsappUrl={whatsappUrl} onSubmit={submitEnquiry} onReset={startAnotherEnquiry} idPrefix="inline-enquiry" className="reveal" />
        </section>

        <section className="final-cta">
          <img src={asset('golden-grove-tower-exterior-blue-hour.jpg')} alt="Golden Grove towers at blue hour" loading="lazy" />
          <div className="final-cta-shade" />
          <div className="final-cta-copy reveal"><span className="eyebrow light-eyebrow"><span /> Prestige Golden Grove</span><h2>Come home<br /><em>to more.</em></h2><a className="button button-gold" href="#enquire" onClick={openEnquiryPopup}>Begin a conversation <ArrowRight size={16} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><img className="brand-mark footer-brand-mark" src="/logo.svg" alt="Prestige Golden Grove" /><span className="brand-copy"><span className="brand-kicker">PRESTIGE</span><span className="brand-title">Golden Grove</span></span></a>
        <p>Where life finds its green.</p>
        <nav aria-label="Footer navigation"><a href="#story">The township</a><a href="#floorplans">Plans</a><a href="#location">Location</a><a href="#enquire" onClick={openEnquiryPopup}>Enquire</a></nav>
        <small>Project information shown as presented in the supplied brochure. Illustrations are indicative. Please verify current details with the project team.</small>
        <span className="copyright">© {new Date().getFullYear()} Prestige Golden Grove</span>
      </footer>

      {preview && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged project image" onClick={() => setPreview(null)}>
        <button type="button" className="lightbox-close" aria-label="Close enlarged image" onClick={() => setPreview(null)}><X size={23} /></button>
        <div className="lightbox-image-wrap" onClick={(event) => event.stopPropagation()}><img src={asset(preview.src)} alt={preview.alt} /><p>{preview.alt}</p></div>
      </div>}
      {launchPopupOpen && <div className="launch-popup" role="dialog" aria-modal="true" aria-label="Prestige Golden Grove launch offer" onClick={() => setLaunchPopupOpen(false)}>
        <button type="button" className="launch-popup-close" aria-label="Close launch offer" onClick={() => setLaunchPopupOpen(false)}><X size={23} /></button>
        <div className="launch-popup-content" onClick={(event) => event.stopPropagation()}>
          <img src={asset('banner-pop-up.jpeg')} alt="Prestige Golden Grove launch and Pre-EMI plan campaign artwork" fetchPriority="high" />
        </div>
      </div>}
      {enquiryPopupOpen && <div className="enquiry-popup" role="dialog" aria-modal="true" aria-label="Prestige Golden Grove enquiry form" onClick={() => setEnquiryPopupOpen(false)}>
        <button type="button" className="enquiry-popup-close" aria-label="Close enquiry form" onClick={() => setEnquiryPopupOpen(false)}><X size={22} /></button>
        <div className="enquiry-popup-panel" onClick={(event) => event.stopPropagation()}>
          <div className="enquiry-popup-intro"><span className="eyebrow light-eyebrow"><span /> Prestige Golden Grove</span><h2>Request a<br /><em>conversation.</em></h2><p>Share a few details and prepare an enquiry for WhatsApp.</p></div>
          <EnquiryForm formStatus={formStatus} whatsappUrl={whatsappUrl} onSubmit={submitEnquiry} onReset={startAnotherEnquiry} idPrefix="popup-enquiry" className="enquiry-popup-form" />
        </div>
      </div>}
    </>
  )
}

export default App
