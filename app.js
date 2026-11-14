// ================= 1. BIẾN TOÀN CỤC & DỮ LIỆU DỰ PHÒNG =================
let globalProducts = [];
let currentLang = 'vi';
let categoryPages = {}; 
const ITEMS_PER_PAGE = 6;

// Giá trị đặc biệt của option "Sản phẩm khác" (khách tự nhập)
const CUSTOM_PRODUCT_VALUE = '__custom__';

// Option "Thị trường khác" -> cho khách tự nhập
const OTHER_MARKET_VALUE = 'Thị trường khác';

// Thị trường xuất khẩu đích (value luôn là tiếng Việt để lưu DB nhất quán)
const TARGET_MARKETS = [
    { value: "Mỹ / Canada (FDA)",        en: "USA / Canada (FDA)" },
    { value: "Châu Âu (EU Standard)",    en: "Europe (EU Standard)" },
    { value: "Trung Đông (Halal Cert)",  en: "Middle East (Halal Cert)" },
    { value: "Nhật / Hàn / ASEAN",       en: "Japan / Korea / ASEAN" },
    { value: OTHER_MARKET_VALUE,         en: "Other markets" }
];

const i18nData = {
    vi: {
        top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong",
        nav_products: "Sản Phẩm Chủ Lực",
        nav_services: "Dịch Vụ OEM/ODM",
        nav_rfq: "Liên Hệ RFQ",
        nav_about: "Giới Thiệu",
        btn_rfq: "Gửi Yêu Cầu Báo Giá (RFQ)",
        
        // Video Fullscreen Section
        video_badge: "SilViet Global Experience",
        video_title: "Hạ Tầng Sourcing & Xuất Khẩu Chuẩn Quốc Tế",
        video_sub: "Kết nối trực tiếp mạng lưới nhà máy sản xuất quy mô lớn tại Việt Nam với các đối tác toàn cầu.",

        // Hero Section
        hero_badge: "B2B Sourcing & Export Connector - Vietnam to Worldwide",
        hero_title_1: "Cầu Nối Xuất Khẩu B2B",
        hero_title_2: "Nông Sản Khô, Đồ Uống & Giày Dép Việt",
        hero_sub: "SilViet kết nối trực tiếp các nhà mua hàng quốc tế với mạng lưới nhà máy chuẩn ISO/HACCP/FDA tại Việt Nam: Hủ tiếu - Bún phở sấy khô, Nước dừa đóng lon & Giày dép xuất khẩu OEM/ODM.",
        stat_factories: "Nhà Máy Đối Tác",
        stat_containers: "Container / Năm",
        stat_qc: "Kiểm Định QC Chuẩn",
        
        // Quick Finder
        finder_title: "Quick Sourcing Finder",
        finder_sub: "Chọn sản phẩm & nhận báo giá trực tiếp",
        finder_label_1: "Nhóm Hàng Cần Sourcing / OEM",
        finder_select_prod: "Chọn sản phẩm OEM / Sourcing",
        finder_label_2: "Thị Trường Xuất Khẩu Đích",
        finder_btn_submit: "Nhận Báo Giá (RFQ)",
        finder_custom_ph: "Nhập sản phẩm bạn cần (VD: bánh tráng, giày da, cà phê...)",
        rfq_custom_ph: "Mô tả sản phẩm bạn cần (tên, quy cách, bao bì...)",
        market_custom_ph: "Nhập thị trường/quốc gia bạn muốn xuất khẩu tới (VD: Úc, Brazil...)",
        opt_select_prod: "Chọn sản phẩm OEM / Sourcing",
        opt_custom_prod: "Sản phẩm khác",
        opt_select_market: "Chọn thị trường (không bắt buộc)",
        alert_select_prod: "Vui lòng chọn sản phẩm cần sourcing!",
        alert_enter_custom: "Vui lòng nhập tên sản phẩm bạn mong muốn!",
        cat_badge: "Chủ Lực Xuất Khẩu",
        cat_title: "Danh Mục Sản Phẩm Kết Nối B2B",
        cat_desc: "Tất cả sản phẩm đều được chuẩn hóa bao bì, nhãn mác đa ngôn ngữ và hồ sơ chứng nhận đầy đủ.",
        
        // Services
        serv_sub: "Dịch Vụ Gia Giá Trị Gia Tăng",
        serv_title: "Dịch Vụ Hỗ Trợ Dành Cho B2B Buyers",
        s1_title: "Gia Công OEM & Private Labeling",
        s1_desc: "In ấn thiết kế bao bì thương hiệu riêng cho hủ tiếu, bún phở, nhãn lon nước dừa & ép logo thương hiệu trên giày dép theo chính xác nhận diện của khách hàng.",
        s2_title: "Kiểm Định QC & Đóng Gói Chuẩn Export",
        s2_desc: "Đội ngũ kỹ sư QC giám sát dây chuyền, đo lường độ ẩm thực phẩm khô, đo độ bám dính đế giày và test độ bền thùng carton chống móp vỡ đường biển.",
        s3_title: "Thủ Tục Hải Quan, C.O & Freight",
        s3_desc: "Xử lý toàn bộ chứng từ kiểm dịch thực vật (Phytosanitary), chứng nhận FDA, C/O ưu đãi thuế xuất khẩu và booking container giao hàng FOB/CIF/DDP.",

        // RFQ Form
        rfq_tag: "Official RFQ Submission",
        rfq_title: "Gửi Yêu Cầu Báo Giá Sourcing & Export",
        rfq_sub: "Điền thông tin bên dưới để nhận bảng thông số Specs & Báo giá chi tiết từ SilViet Sourcing.",
        rfq_company: "Tên Công Ty / Doanh Nghiệp Buyers *",
        rfq_email: "Email Liên Hệ Chính *",
        rfq_phone: "Số Điện Thoại / WhatsApp / WeChat *",
        rfq_incoterm: "Điều Kiện Giao Hàng (Incoterms)",
        rfq_prod_select: "Sản Phẩm Quan Tâm *",
        rfq_qty: "Sản Lượng Đơn Hàng Dự Kiến *",
        rfq_details: "Yêu Cầu Chi Tiết (Yêu cầu Private Label, Chứng nhận đặc thù...)",
        btn_submit_rfq: "Gửi Yêu Cầu Báo Giá Chính Thức",

        // RFQ Alert Messages
        rfq_success_title: "Gửi Yêu Cầu Báo Giá (RFQ) Thành Công!",
        rfq_success_desc: "SilViet Sourcing đã tiếp nhận thông tin và sẽ gửi bảng Specs & báo giá chi tiết qua email cho bạn.",
        rfq_err_conn: "Lỗi Kết Nối! Không tìm thấy client Supabase.",
        rfq_err_fail: "Gửi RFQ Thất Bại!",

        // Footer
        foot_desc: "Đơn vị kết nối thương mại & xuất khẩu B2B thuộc SilViet Group. Chuyên dòng thực phẩm khô, nước dừa đóng lon & giày dép xuất khẩu sang EU, US, Middle East.",
        foot_products: "Dòng Sản Phẩm Chủ Lực",
        foot_links: "Điều Hướng",
        foot_contact: "Trụ Sở Sourcing Hub"
    },
    en: {
        top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong",
        nav_products: "Core Products",
        nav_services: "OEM/ODM Services",
        nav_rfq: "Inquire RFQ",
        nav_about: "About Us",
        btn_rfq: "Request a Quote (RFQ)",

        // Video Fullscreen Section
        video_badge: "SilViet Global Experience",
        video_title: "International Standard Sourcing & Export Infrastructure",
        video_sub: "Directly connecting large-scale manufacturing networks in Vietnam with global partners.",
        
        // Hero Section
        hero_badge: "B2B Sourcing & Export Connector - Vietnam to Worldwide",
        hero_title_1: "B2B Export Connector",
        hero_title_2: "Dry Foods, Beverages & Footwear from Vietnam",
        hero_sub: "SilViet directly connects international buyers with ISO/HACCP/FDA-certified manufacturing networks in Vietnam: Dried Rice Noodles, Canned Coconut Water & OEM/ODM Footwear.",
        stat_factories: "Verified Factories",
        stat_containers: "Containers / Year",
        stat_qc: "Standard QC Audit",
        
        // Quick Finder
        finder_title: "Quick Sourcing Finder",
        finder_sub: "Pick a product & get a direct quote",
        finder_label_1: "Sourcing / OEM Product Category",
        finder_select_prod: "Select OEM / Sourcing product",
        finder_label_2: "Target Export Market",
        finder_btn_submit: "Get Quote (RFQ)",
        finder_custom_ph: "Enter the product you need (e.g. rice paper, leather shoes, coffee...)",
        rfq_custom_ph: "Describe the product you need (name, spec, packaging...)",
        market_custom_ph: "Enter the market/country you want to export to (e.g. Australia, Brazil...)",
        opt_select_prod: "Select OEM / Sourcing product",
        opt_custom_prod: "✍️ Other product - I'll enter my own request",
        opt_select_market: "Select market (optional)",
        alert_select_prod: "Please select a product to source!",
        alert_enter_custom: "Please enter the product you are looking for!",
        cat_badge: "Core Export Highlights",
        cat_title: "B2B Connected Product Catalog",
        cat_desc: "All products feature standardized multi-language packaging, labeling, and complete certification records.",
        
        // Services
        serv_sub: "Value-Added Services",
        serv_title: "Support Services for B2B Buyers",
        s1_title: "OEM & Private Label Manufacturing",
        s1_desc: "Custom packaging design and printing for rice noodles, coconut water cans, and brand embossing on footwear matching buyer specifications.",
        s2_title: "QC Inspection & Export Packaging",
        s2_desc: "Dedicated QC engineers supervise production lines, measure moisture content in dry foods, peel strength in footwear, and test export carton durability.",
        s3_title: "Customs Clearance, C.O & Freight",
        s3_desc: "Handling all Phytosanitary certificates, FDA registration, preferential export C/O, and container booking for FOB/CIF/DDP deliveries.",

        // RFQ Form
        rfq_tag: "Official RFQ Submission",
        rfq_title: "Submit Sourcing & Export RFQ",
        rfq_sub: "Fill in the details below to receive detailed product specs and quotations from SilViet Sourcing.",
        rfq_company: "Buyer Company Name *",
        rfq_email: "Primary Contact Email *",
        rfq_phone: "Phone / WhatsApp / WeChat *",
        rfq_incoterm: "Incoterms Delivery Terms",
        rfq_prod_select: "Product of Interest *",
        rfq_qty: "Estimated Order Volume *",
        rfq_details: "Detailed Requirements (Private Label, Special Certifications...)",
        btn_submit_rfq: "Submit Official Quote Request",

        // RFQ Alert Messages
        rfq_success_title: "Official Quote Request (RFQ) Submitted Successfully!",
        rfq_success_desc: "SilViet Sourcing has received your information and will send detailed specs & quotation via email.",
        rfq_err_conn: "Connection Error! Supabase client not found.",
        rfq_err_fail: "RFQ Submission Failed!",

        // Footer
        foot_desc: "B2B trade and export connector under SilViet Group. Specializing in dry foods, canned coconut water, and export footwear to the EU, US, and Middle East.",
        foot_products: "Core Product Lines",
        foot_links: "Quick Links",
        foot_contact: "Sourcing Hub Headquarters"
    }
};

function updateStaticTexts(lang) {
    const texts = i18nData[lang];
    if (!texts) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (texts[key]) el.placeholder = texts[key];
    });
}

// ================= 2. KHỞI TẠO KHI TẢI TRANG =================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    loadDynamicCategories();
    renderMarketOptions();
    loadProducts();

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 120,
            anchorPlacement: 'top-bottom'
        });
    }
});

// ================= 3. ĐIỀU HƯỚNG & GIAO DIỆN (UI CONTROLS) =================

function toggleLanguage() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';

    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
        langLabel.textContent = currentLang === 'vi' ? 'VI / EN' : 'EN / VI';
    }

    updateStaticTexts(currentLang);

    if (typeof loadDynamicCategories === 'function') {
        loadDynamicCategories();
    }
    renderProductSelects();
    renderMarketOptions();
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

function switchCategoryTab(targetSlug) {
    document.querySelectorAll('.cat-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.cat-tab-btn').forEach(b => {
        b.classList.remove('bg-brand-blue', 'text-white', 'font-semibold');
        b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:border-slate-700', 'font-medium');
    });

    const activeContent = document.getElementById(`catContent-${targetSlug}`);
    if (activeContent) activeContent.classList.remove('hidden');

    const activeBtn = document.getElementById(`tabBtn-${targetSlug}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:border-slate-700', 'font-medium');
        activeBtn.classList.add('bg-brand-blue', 'text-white', 'font-semibold');
    }
}

function scrollToRFQ() {
    const rfqSection = document.getElementById('rfq-form') || document.getElementById('rfq');
    if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.openRfqModal = function(productIdOrName) {
    scrollToRFQ();
};

function requestQuoteFor(productName) {
    const selectEl = document.getElementById('rfqProdSelect');
    if (selectEl && productName) {
        for (let i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].text.includes(productName)) {
                selectEl.selectedIndex = i;
                handleRFQProductChange({ target: selectEl });
                break;
            }
        }
    }
    scrollToRFQ();
}


// ================= 4. SUPABASE DATA & RENDER PRODUCTS =================

const PRODUCT_IMG_BUCKET = 'Img';
const PRODUCT_IMG_FALLBACK = 'https://placehold.co/600x400/0f172a/ffffff?text=SilViet+Product';

function getProductImageUrl(prod) {
    const raw = (prod && prod.image_url ? String(prod.image_url) : '').trim();
    if (!raw) return PRODUCT_IMG_FALLBACK;
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:')) return raw;
    try {
        const { data } = window.dbClient.storage.from(PRODUCT_IMG_BUCKET).getPublicUrl(raw);
        return (data && data.publicUrl) || PRODUCT_IMG_FALLBACK;
    } catch (e) {
        console.error('Lỗi lấy ảnh từ Storage:', e);
        return PRODUCT_IMG_FALLBACK;
    }
}

async function loadDynamicCategories() {
    const tabsContainer = document.getElementById('categoryTabsContainer');
    const contentsContainer = document.getElementById('categoryContentsContainer');

    if (!tabsContainer || !contentsContainer) return;
    if (!window.dbClient) {
        console.error("window.dbClient chưa sẵn sàng!");
        return;
    }

    try {
        const [catRes, prodRes] = await Promise.all([
            window.dbClient.from('categories').select('*'),
            window.dbClient.from('products').select('*, product_details(*)').order('created_at', { ascending: true })
        ]);

        if (catRes.error) throw catRes.error;
        if (prodRes.error) throw prodRes.error;

        const categories = catRes.data || [];
        const products = prodRes.data || [];
        window.allProductsData = products;

        const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';

        if (categories.length === 0) {
            const noCatMsg = isEn ? 'No category data available.' : 'Không có dữ liệu danh mục.';
            tabsContainer.innerHTML = `<p class="text-slate-500 text-sm">${noCatMsg}</p>`;
            return;
        }

        tabsContainer.innerHTML = '';
        contentsContainer.innerHTML = '';

        categories.forEach((cat, index) => {
            const isFirst = index === 0;
            const categoryDisplayName = isEn ? (cat.name_en || cat.name) : cat.name;

            if (!categoryPages[cat.slug]) {
                categoryPages[cat.slug] = 1;
            }

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = `tabBtn-${cat.slug}`;
            btn.onclick = () => switchCategoryTab(cat.slug);
            btn.className = `cat-tab-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                isFirst 
                    ? 'bg-brand-blue text-white font-semibold' 
                    : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:border-brand-blue hover:text-brand-blue font-medium'
            }`;
            btn.innerHTML = `<span>${cat.icon || '📦'}</span> ${categoryDisplayName}`;
            tabsContainer.appendChild(btn);

            const catProducts = products.filter(p => p.category_id === cat.id || p.category_slug === cat.slug);
            const currentPage = categoryPages[cat.slug];
            const totalPages = Math.ceil(catProducts.length / ITEMS_PER_PAGE) || 1;

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginatedProducts = catProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            const gridDiv = document.createElement('div');
            gridDiv.id = `catContent-${cat.slug}`;
            gridDiv.className = `cat-content space-y-6 ${isFirst ? '' : 'hidden'}`;

            if (paginatedProducts.length > 0) {
                const productsGrid = document.createElement('div');
                productsGrid.className = `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`;
                productsGrid.innerHTML = paginatedProducts.map(prod => renderProductCard(prod)).join('');
                gridDiv.appendChild(productsGrid);

                if (totalPages > 1) {
                    const paginationDiv = document.createElement('div');
                    paginationDiv.className = `flex justify-center items-center gap-2 pt-6`;
                    
                    let paginationHTML = '';
                    const prevDisabled = currentPage === 1;
                    paginationHTML += `
                        <button type="button" onclick="changeCategoryPage('${cat.slug}', ${currentPage - 1})" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 transition ${prevDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:border-brand-blue cursor-pointer'}">
                            &laquo; Prev
                        </button>
                    `;

                    for (let i = 1; i <= totalPages; i++) {
                        const isActive = i === currentPage;
                        paginationHTML += `
                            <button type="button" onclick="changeCategoryPage('${cat.slug}', ${i})" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${isActive ? 'bg-brand-blue text-white' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-700'}">
                                ${i}
                            </button>
                        `;
                    }

                    const nextDisabled = currentPage === totalPages;
                    paginationHTML += `
                        <button type="button" onclick="changeCategoryPage('${cat.slug}', ${currentPage + 1})" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 transition ${nextDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:border-brand-blue cursor-pointer'}">
                            Next &raquo;
                        </button>
                    `;

                    paginationDiv.innerHTML = paginationHTML;
                    gridDiv.appendChild(paginationDiv);
                }

            } else {
                const emptyMsg = isEn ? 'No products found in this category.' : 'Chưa có sản phẩm nào thuộc danh mục này.';
                gridDiv.innerHTML = `
                    <div class="col-span-full py-12 text-center bg-slate-800/30 rounded-2xl border border-slate-800">
                        <p class="text-slate-400 text-sm italic">${emptyMsg}</p>
                    </div>
                `;
            }

            contentsContainer.appendChild(gridDiv);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();

    } catch (err) {
        console.error("Lỗi tải danh mục từ Supabase:", err);
    }
}

function changeCategoryPage(catSlug, pageNum) {
    categoryPages[catSlug] = pageNum;
    loadDynamicCategories();
}

function openProductDetailModal(productId) {
    const product = (window.allProductsData || globalProducts || []).find(p => String(p.id) === String(productId));
    if (!product) return;

    const name = product.name_vi || product.name_en || product.name || 'Sản phẩm xuất khẩu';
    const packaging = product.packaging || 'Thùng 10kg / PE Bag';
    const specsDetail = product.specs_detail || product.specs || 'Chuẩn xuất khẩu B2B';
    const specsCert = product.specs_cert || 'FDA, ISO 22000';
    const img = getProductImageUrl(product);

    const details = Array.isArray(product.product_details) ? product.product_details[0] : product.product_details;
    const cartonSize = details?.carton_size || '37 x 45 x 35 cm';
    const ingredients = details?.ingredients || 'Gạo, Nước, Tinh bột sắn, Muối (Đang cập nhật)';
    const usage = details?.usage || 'Chế biến theo tiêu chuẩn hướng dẫn trên bao bì.';
    const storage = details?.storage || 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.';

    document.getElementById('detailProductImage').src = img;
    document.getElementById('detailProductImage').style.objectFit = 'contain';
    document.getElementById('detailThumb1').src = img;
    document.getElementById('detailProductName').innerText = name;
    document.getElementById('detailProductTag').innerText = product.category || 'SOURCING';
    
    document.getElementById('detailProductType').innerText = specsDetail;
    document.getElementById('detailProductPackaging').innerText = packaging;
    document.getElementById('detailProductCartonSize').innerText = cartonSize;
    document.getElementById('detailProductBarcode').innerText = specsCert;

    document.getElementById('detailProductIngredients').innerText = ingredients;
    document.getElementById('detailProductStorage').innerText = storage;

    const usageContainer = document.getElementById('detailProductUsage');
    if (usageContainer) {
        const usageList = usage.split('\n').map(item => `<li>${item}</li>`).join('');
        usageContainer.innerHTML = usageList || `<li>${usage}</li>`;
    }

    const rfqBtn = document.getElementById('detailRfqBtn');
    if (rfqBtn) {
        rfqBtn.onclick = function() {
            closeProductDetailModal();
            requestQuoteFor(name);
        };
    }

    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('hidden');
}

function closeProductDetailModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.add('hidden');
}

function renderProductCard(prod) {
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';

    const productName = isEn 
        ? (prod.name_en || prod.name_vi || prod.name || 'Export Product') 
        : (prod.name_vi || prod.name || prod.name_en || 'Sản phẩm xuất khẩu');

    const desc = isEn 
        ? (prod.specs_en || prod.specs || prod.description || 'Export standard product.') 
        : (prod.specs || prod.description || 'Sản phẩm đạt chuẩn xuất khẩu.');

    const packing = isEn 
        ? (prod.packaging_en || prod.packaging || prod.specs_packing || '5kg / 10kg Carton') 
        : (prod.packaging || prod.specs_packing || 'Thùng 5kg / 10kg');

    const detail = isEn 
        ? (prod.specs_detail_en || prod.specs_detail || prod.specs || 'B2B Export Standard') 
        : (prod.specs_detail || prod.specs || 'Chuẩn xuất khẩu B2B');

    const cert = isEn 
        ? (prod.specs_cert_en || prod.specs_cert || prod.certifications || 'FDA, ISO 22000') 
        : (prod.specs_cert || prod.certifications || 'FDA, ISO 22000');

    const img = getProductImageUrl(prod);
    const safeName = productName.replace(/'/g, "\\'");

    const labels = {
        clickDetail: isEn ? 'Click to view details' : 'Bấm xem chi tiết',
        packaging: isEn ? 'Packaging:' : 'Quy cách:',
        specs: isEn ? 'Specs:' : 'Thông số:',
        cert: isEn ? 'Certifications:' : 'Chứng nhận:',
        btnQuote: isEn ? 'Request Specs & Quote →' : 'Yêu Cầu Specs & Báo Giá →'
    };

    return `
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-brand-blue transition flex flex-col justify-between">
            <div>
                <div onclick="openProductDetailModal('${prod.id}')" class="relative h-56 overflow-hidden bg-white flex items-center justify-center cursor-pointer group">
                    <img src="${img}" alt="${productName}" loading="lazy" class="w-full h-full object-contain p-3" style="filter:brightness(1.05);" onerror="this.src='https://placehold.co/600x400/0f172a/ffffff?text=SilViet+Product'">
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 text-brand-blue text-xs font-medium shadow-sm">
                        ${prod.tag || 'SOURCING'}
                    </span>
                    <span class="absolute bottom-2 left-2 bg-slate-900/80 text-slate-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition z-10">${labels.clickDetail}</span>
                </div>

                <div class="p-5 space-y-2">
                    <h3 onclick="openProductDetailModal('${prod.id}')" class="text-slate-900 dark:text-white font-semibold text-base leading-snug cursor-pointer hover:text-brand-blue transition">${productName}</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">${desc}</p>
                    
                    <div class="pt-3 space-y-2 text-sm border-t border-slate-200 dark:border-slate-700 mt-3 text-slate-500 dark:text-slate-300">
                        <div class="flex justify-between"><span>${labels.packaging}</span> <span class="font-medium text-slate-900 dark:text-white">${packing}</span></div>
                        <div class="flex justify-between"><span>${labels.specs}</span> <span class="font-medium text-slate-900 dark:text-white">${detail}</span></div>
                        <div class="flex justify-between"><span>${labels.cert}</span> <span class="font-medium text-brand-blue dark:text-brand-blueLight">${cert}</span></div>
                    </div>
                </div>
            </div>

            <div class="p-5 pt-0">
                <button type="button" onclick="requestQuoteFor('${safeName}')" class="w-full py-2.5 rounded-xl border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold text-sm transition text-center block cursor-pointer">
                    ${labels.btnQuote}
                </button>
            </div>
        </div>
    `;
}

// ================= 5. DANH SÁCH SẢN PHẨM (FINDER + RFQ) =================

async function loadProducts() {
    try {
        const { data: products, error } = await window.dbClient
            .from('products')
            .select('*, product_details(*)')
            .order('created_at', { ascending: true });

        if (error) throw error;

        globalProducts = products || [];
        window.allProductsData = globalProducts;
    } catch (err) {
        console.error('Lỗi tải danh sách sản phẩm:', err.message);
    }
    renderProductSelects();
}

function renderProductSelects() {
    const t = i18nData[currentLang] || i18nData.vi;

    [
        { id: 'finderProductSelect', withPacking: false, grouped: false },
        { id: 'rfqProdSelect',        withPacking: true,  grouped: true  }
    ].forEach(({ id, withPacking, grouped }) => {
        const sel = document.getElementById(id);
        if (!sel) return;

        const prev = sel.value;
        sel.innerHTML = '';
        sel.add(new Option(t.opt_select_prod, ''));

        const GROUPS = [
            { key: 'noodles',   vi: 'Nông Sản & Đồ Khô',          en: 'Agricultural & Dry Goods' },
            { key: 'beverages', vi: 'Đồ Uống & Nước Giải Khát',   en: 'Beverages & Refreshments' },
            { key: 'footwear',  vi: 'Giày Dép & Gia Công OEM',    en: 'Footwear & OEM Manufacturing' }
        ];
        const isEnSel = currentLang === 'en';
        const makeOption = (item) => {
            const name = (item.name_vi || item.name || item.name_en || 'Sản phẩm xuất khẩu').trim();
            const packing = (withPacking && item.packaging) ? ` (${item.packaging})` : '';
            return new Option(`${name}${packing}`, item.id);
        };
        const known = new Set(GROUPS.map(g => g.key));
        if (grouped) {
            GROUPS.forEach(g => {
                const items = globalProducts.filter(p => p.category === g.key || p.category_slug === g.key);
                if (items.length === 0) return;
                const og = document.createElement('optgroup');
                og.label = isEnSel ? g.en : g.vi;
                items.forEach(item => og.appendChild(makeOption(item)));
                sel.appendChild(og);
            });
            globalProducts.filter(p => !known.has(p.category) && !known.has(p.category_slug)).forEach(item => sel.add(makeOption(item)));
        } else {
            // Danh sách phẳng, không có tiêu đề nhóm
            globalProducts.forEach(item => sel.add(makeOption(item)));
        }

        sel.add(new Option(t.opt_custom_prod, CUSTOM_PRODUCT_VALUE));

        if (prev && Array.from(sel.options).some(o => o.value === String(prev))) {
            sel.value = prev;
        }
        
        // Kích hoạt sự kiện cập nhật lại custom dropdown nếu đã được khởi tạo
        if (typeof sel._svRebuild === 'function') {
            sel._svRebuild();
        }
    });

    handleQuickProductChange();
    handleRFQProductChange();
}

function renderMarketOptions() {
    const isEn = currentLang === 'en';
    const t = i18nData[currentLang] || i18nData.vi;

    ['quickTargetMarket', 'rfqTargetMarket'].forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;

        const prev = sel.value;
        sel.innerHTML = '';
        sel.add(new Option(t.opt_select_market, ''));
        TARGET_MARKETS.forEach(m => sel.add(new Option(isEn ? m.en : m.value, m.value)));
        if (prev) sel.value = prev;

        if (typeof sel._svRebuild === 'function') {
            sel._svRebuild();
        }
    });

    handleQuickMarketChange();
    handleRFQMarketChange();
}

function applyOtherMode({ selectId, boxId, wrapId, inputId, isOther, required }) {
    const sel = document.getElementById(selectId);
    const box = document.getElementById(boxId);
    const wrap = document.getElementById(wrapId);
    const input = document.getElementById(inputId);
    const userPicked = !!sel && document.activeElement === sel;

    if (box) box.classList.toggle('hidden', isOther);
    if (wrap) wrap.classList.toggle('hidden', !isOther);
    if (input) {
        input.required = !!(isOther && required);
        if (!isOther) input.value = '';
        else if (userPicked) input.focus();
    }
}

function backToList(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.value = '';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    sel.focus();
}

function handleQuickMarketChange() {
    const sel = document.getElementById('quickTargetMarket');
    applyOtherMode({ selectId: 'quickTargetMarket', boxId: 'quickMarketBox', wrapId: 'quickMarketCustomWrap',
        inputId: 'quickMarketCustom', isOther: !!sel && sel.value === OTHER_MARKET_VALUE, required: false });
}

function handleRFQMarketChange() {
    const sel = document.getElementById('rfqTargetMarket');
    applyOtherMode({ selectId: 'rfqTargetMarket', boxId: 'rfqMarketBox', wrapId: 'rfqMarketCustomWrap',
        inputId: 'rfqMarketCustom', isOther: !!sel && sel.value === OTHER_MARKET_VALUE, required: true });
}

function getMarketValue(selectId, inputId) {
    const sel = document.getElementById(selectId);
    if (!sel || sel.value === '') return '';
    if (sel.value === OTHER_MARKET_VALUE) {
        const txt = document.getElementById(inputId)?.value.trim() || '';
        return txt ? `${OTHER_MARKET_VALUE}: ${txt}` : OTHER_MARKET_VALUE;
    }
    return sel.value;
}

// ================= 6. QUICK SOURCING FINDER (HERO SECTION) =================

const FINDER_BTN_ACTIVE = "w-full bg-gradient-to-r from-brand-blue to-brand-emerald hover:brightness-110 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-emerald/10 transition-all flex items-center justify-center gap-2 mt-2 text-xs cursor-pointer";
const FINDER_BTN_DISABLED = "w-full bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 text-xs";

function checkFinderFormValid() {
    const prodSelect = document.getElementById('finderProductSelect');
    const customInput = document.getElementById('finderCustomProduct');
    const submitBtn = document.getElementById('finderSubmitBtn');
    if (!prodSelect || !submitBtn) return;

    const isCustom = prodSelect.value === CUSTOM_PRODUCT_VALUE;
    const valid = prodSelect.value !== '' &&
        (!isCustom || (customInput && customInput.value.trim() !== ''));

    submitBtn.disabled = !valid;
    submitBtn.className = valid ? FINDER_BTN_ACTIVE : FINDER_BTN_DISABLED;
}

document.addEventListener('DOMContentLoaded', () => {
    const customInput = document.getElementById('finderCustomProduct');
    if (customInput) {
        ['input', 'change', 'keyup', 'paste'].forEach(evt => {
            customInput.addEventListener(evt, () => setTimeout(checkFinderFormValid, 0));
        });
    }
    checkFinderFormValid();
});

function handleQuickProductChange() {
    const prodSelect = document.getElementById('finderProductSelect');
    if (!prodSelect) return;

    applyOtherMode({ selectId: 'finderProductSelect', boxId: 'finderProductBox', wrapId: 'finderCustomWrap',
        inputId: 'finderCustomProduct', isOther: prodSelect.value === CUSTOM_PRODUCT_VALUE, required: false });

    checkFinderFormValid();
}

function handleHeroFinder(event) {
    event.preventDefault();
    const t = i18nData[currentLang] || i18nData.vi;

    const finderProdSelect = document.getElementById('finderProductSelect');
    const finderCustom = document.getElementById('finderCustomProduct');
    const quickMarketSelect = document.getElementById('quickTargetMarket');

    if (!finderProdSelect || finderProdSelect.value === '') {
        alert(t.alert_select_prod);
        return;
    }

    const isCustom = finderProdSelect.value === CUSTOM_PRODUCT_VALUE;
    const customText = finderCustom ? finderCustom.value.trim() : '';
    if (isCustom && !customText) {
        alert(t.alert_enter_custom);
        return;
    }

    const mainForm = document.getElementById('rfqMainForm');
    if (mainForm) mainForm.reset();

    const rfqProdSelect = document.getElementById('rfqProdSelect');
    if (rfqProdSelect) {
        rfqProdSelect.value = finderProdSelect.value;
        handleRFQProductChange();
        if (isCustom) {
            const rfqCustom = document.getElementById('rfqCustomProduct');
            if (rfqCustom) rfqCustom.value = customText;
        }
    }

    const rfqTargetMarket = document.getElementById('rfqTargetMarket');
    if (quickMarketSelect && quickMarketSelect.value !== '' && rfqTargetMarket) {
        rfqTargetMarket.value = quickMarketSelect.value;
        handleRFQMarketChange();
        if (quickMarketSelect.value === OTHER_MARKET_VALUE) {
            const rfqMarketCustom = document.getElementById('rfqMarketCustom');
            const quickMarketCustom = document.getElementById('quickMarketCustom');
            if (rfqMarketCustom && quickMarketCustom) rfqMarketCustom.value = quickMarketCustom.value.trim();
        }
    } else {
        handleRFQMarketChange();
    }

    scrollToRFQ();
}

// ================= 7. RFQ FORM =================

function handleRFQProductChange() {
    const sel = document.getElementById('rfqProdSelect');
    if (!sel) return;

    applyOtherMode({ selectId: 'rfqProdSelect', boxId: 'rfqProdBox', wrapId: 'rfqCustomWrap',
        inputId: 'rfqCustomProduct', isOther: sel.value === CUSTOM_PRODUCT_VALUE, required: true });
}

let rfqSubmitting = false;

function ensureRfqToastStyle() {
    if (document.getElementById('rfqToastStyle')) return;
    const st = document.createElement('style');
    st.id = 'rfqToastStyle';
    st.textContent = `
        @keyframes rfqPop { 0% { transform: scale(.7); opacity: 0 } 60% { transform: scale(1.05); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes rfqDraw { to { stroke-dashoffset: 0 } }
        @keyframes rfqSpin { to { transform: rotate(360deg) } }
        #rfqSuccessOverlay { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center;
            background: rgba(15,23,42,.55); backdrop-filter: blur(3px); padding: 16px; }
        #rfqSuccessOverlay .rfq-card { background: #fff; color: #0f172a; border-radius: 20px; max-width: 400px; width: 100%;
            padding: 32px 24px 24px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,.35); animation: rfqPop .45s ease-out; }
        #rfqSuccessOverlay .rfq-check { width: 76px; height: 76px; border-radius: 50%; background: #10b981; margin: 0 auto 16px;
            display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 8px rgba(16,185,129,.18); }
        #rfqSuccessOverlay .rfq-check path { stroke: #fff; stroke-width: 5; fill: none; stroke-linecap: round; stroke-linejoin: round;
            stroke-dasharray: 48; stroke-dashoffset: 48; animation: rfqDraw .5s .25s ease-out forwards; }
        #rfqSuccessOverlay h3 { font-size: 18px; font-weight: 800; margin: 0 0 8px; color: #047857; }
        #rfqSuccessOverlay p { font-size: 13px; line-height: 1.5; margin: 0; color: #475569; }
        #rfqSuccessOverlay .rfq-time { display: inline-block; margin-top: 12px; padding: 4px 10px; border-radius: 999px;
            background: #ecfdf5; color: #047857; font-size: 11px; font-weight: 700; }
        #rfqSuccessOverlay button { margin-top: 18px; width: 100%; padding: 12px; border: 0; border-radius: 12px; cursor: pointer;
            background: #0b5fa5; color: #fff; font-weight: 700; font-size: 13px; }
        .rfq-spinner { display: inline-block; width: 14px; height: 14px; margin-right: 8px; vertical-align: -2px;
            border: 2px solid rgba(255,255,255,.5); border-top-color: #fff; border-radius: 50%; animation: rfqSpin .7s linear infinite; }
    `;
    document.head.appendChild(st);
}

function showRfqSuccessPopup(texts, isEn) {
    ensureRfqToastStyle();
    const old = document.getElementById('rfqSuccessOverlay');
    if (old) old.remove();

    const time = new Date().toLocaleTimeString(isEn ? 'en-GB' : 'vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const sentAt = isEn ? `Sent at ${time}` : `Đã gửi lúc ${time}`;
    const closeTxt = isEn ? 'Close' : 'Đóng';

    const overlay = document.createElement('div');
    overlay.id = 'rfqSuccessOverlay';
    overlay.innerHTML = `
        <div class="rfq-card" role="alertdialog" aria-live="assertive">
            <div class="rfq-check"><svg width="40" height="40" viewBox="0 0 40 40"><path d="M9 21 L17 29 L31 12"/></svg></div>
            <h3>${texts.rfq_success_title}</h3>
            <p>${texts.rfq_success_desc}</p>
            <span class="rfq-time">${sentAt}</span>
            <button type="button">${closeTxt}</button>
        </div>`;
    const close = () => overlay.remove();
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    overlay.querySelector('button').addEventListener('click', close);
    document.body.appendChild(overlay);
    setTimeout(close, 8000);
}

async function handleMainRFQSubmit(event) {
    event.preventDefault();
    if (rfqSubmitting) return;

    const alertBox = document.getElementById('rfqAlertBox');
    if (alertBox) alertBox.classList.add('hidden');

    const submitBtn = document.querySelector('#rfqMainForm button[type="submit"]');
    const submitBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    const setSending = (on) => {
        rfqSubmitting = on;
        if (!submitBtn) return;
        submitBtn.disabled = on;
        submitBtn.style.opacity = on ? '.7' : '';
        submitBtn.style.cursor = on ? 'not-allowed' : '';
        if (on) submitBtn.innerHTML = `<span class="rfq-spinner"></span>${currentLang === 'en' ? 'Sending...' : 'Đang gửi...'}`;
        else submitBtn.innerHTML = submitBtnHtml;
    };
    ensureRfqToastStyle();
    const companyName = document.getElementById('rfqComp')?.value.trim() || '';
    const email = document.getElementById('rfqMail')?.value.trim() || '';
    const phone = document.getElementById('rfqTel')?.value.trim() || '';
    const incoterm = document.getElementById('rfqIncoterm')?.value || 'FOB';
    
    const prodSelectEl = document.getElementById('rfqProdSelect');
    let productCategory = '';
    if (prodSelectEl && prodSelectEl.value === CUSTOM_PRODUCT_VALUE) {
        const customText = document.getElementById('rfqCustomProduct')?.value.trim() || '';
        productCategory = `Sản phẩm khác (khách tự nhập): ${customText}`;
    } else if (prodSelectEl && prodSelectEl.selectedOptions.length > 0) {
        productCategory = prodSelectEl.selectedOptions[0].text;
    }

    const quantity = document.getElementById('rfqQty')?.value.trim() || '';
    const targetMarket = getMarketValue('rfqTargetMarket', 'rfqMarketCustom');
    const shippingMethod = document.getElementById('rfqShippingMethod')?.value || '';
    const details = document.getElementById('rfqDetails')?.value.trim() || '';

    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const texts = i18nData[isEn ? 'en' : 'vi'];

    const rfqPayload = {
        full_name: companyName,
        email: email,
        phone: phone,
        incoterm: incoterm,
        product_category: productCategory,
        quantity: quantity,
        target_market: targetMarket,
        shipping_method: shippingMethod,
        notes: details,
        status: 'pending'
    };

    const supabaseClient = window.dbClient || window.supabase;
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `<strong class="font-bold">${texts.rfq_err_conn}</strong>`;
            alertBox.classList.remove('hidden');
        }
        return;
    }

    setSending(true);
    try {
        const { error } = await supabaseClient
            .from('rfq_requests')
            .insert([rfqPayload]);

        if (error) throw error;

        const mainForm = document.getElementById('rfqMainForm');
        if (mainForm) mainForm.reset();
        handleRFQProductChange();
        handleRFQMarketChange();

        showRfqSuccessPopup(texts, isEn);

    } catch (err) {
        console.error('Lỗi khi gửi RFQ:', err.message);
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `<div><strong class="font-bold block text-rose-200">${texts.rfq_err_fail}</strong> Chi tiết: ${err.message}</div>`;
            alertBox.classList.remove('hidden');
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } finally {
        setSending(false);
    }
}

// ================= 8. INTRO & AUDIO CONTROL =================

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("companyIntroVideo");
    if (video) {
        video.muted = true; 
        video.pause();
    }
    setTimeout(() => { finishIntro(); }, 4500);
});

function finishIntro() {
    const intro = document.getElementById("introSplash");
    const video = document.getElementById("companyIntroVideo");

    if (intro) {
        intro.style.transition = "opacity 1.2s ease";
        intro.style.opacity = '0';
        setTimeout(() => { intro.remove(); }, 1200);
    }

    if (video) {
        video.muted = true; 
        video.play().catch(error => { console.log("Trình duyệt chặn autoplay:", error); });
    }
}

function skipIntro() { finishIntro(); }

function toggleAudio() {
    const video = document.getElementById('bgCompanyVideo') || document.getElementById('companyIntroVideo');
    const audioText = document.getElementById('audioText');
    const audioIcon = document.getElementById('audioIcon');
    
    if (!video) return;

    const mutedIconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`;
    const unmutedIconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;

    if (video.muted) {
        video.muted = false;
        if (audioText) audioText.innerText = 'Tắt tiếng';
        if (audioIcon) audioIcon.innerHTML = unmutedIconPath;
    } else {
        video.muted = true;
        if (audioText) audioText.innerText = 'Bật tiếng';
        if (audioIcon) audioIcon.innerHTML = mutedIconPath;
    }
}

// ================= 9. CUSTOM DROPDOWN (ĐÃ FIX LỖI KẸT & CHE KHUẤT) =================
(function () {
    const CSS = `
    .sv-dd { position: relative; width: 100%; }
    .sv-dd > select.sv-native { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; pointer-events: none; }
    .sv-dd-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;
        text-align: left; font: inherit; padding: 12px 14px; border-radius: 12px; cursor: pointer;
        color: #0f172a; background: #f8fafc; border: 1px solid #cbd5e1; outline: none;
        transition: border-color .15s, box-shadow .15s, background .15s; }
    .sv-dd-btn:hover { border-color: #0b5fa5; }
    .sv-dd.open .sv-dd-btn, .sv-dd-btn:focus-visible { border-color: #0b5fa5; box-shadow: 0 0 0 3px rgba(11,95,165,.15); }
    .sv-dd-btn.placeholder .sv-dd-label { color: #94a3b8; }
    .sv-dd-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sv-dd-chev { flex: none; width: 16px; height: 16px; color: #94a3b8; transition: transform .2s; }
    .sv-dd.open .sv-dd-chev { transform: rotate(180deg); color: #0b5fa5; }
    .sv-dd-panel { position: fixed; z-index: 9999; display: none;
        max-height: 360px; overflow-y: auto; padding: 6px; border-radius: 14px; background: #ffffff;
        border: 1px solid #e2e8f0; box-shadow: 0 16px 40px -8px rgba(15,23,42,.28); }
    .sv-dd-panel.open { display: block; animation: svDdIn .14s ease-out; }
    @keyframes svDdIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
    .sv-dd-group { padding: 8px 10px 4px; font-size: 11px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: #0b5fa5; }
    .sv-dd-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 10px;
        border-radius: 9px; cursor: pointer; color: #1e293b; line-height: 1.35; }
    .sv-dd-item.grouped { padding-left: 16px; }
    .sv-dd-item.muted { color: #94a3b8; }
    .sv-dd-item.active { background: #eff6ff; }
    .sv-dd-item.selected { color: #0b5fa5; font-weight: 600; }
    .sv-dd-check { flex: none; width: 15px; height: 15px; color: #0b5fa5; opacity: 0; }
    .sv-dd-item.selected .sv-dd-check { opacity: 1; }
    .sv-dd-panel::-webkit-scrollbar { width: 6px; }
    .sv-dd-panel::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
    .dark .sv-dd-btn { color: #f8fafc; background: rgba(2,6,23,.9); border-color: #334155; }
    .dark .sv-dd-btn:hover, .dark .sv-dd.open .sv-dd-btn { border-color: #34d399; }
    .dark .sv-dd.open .sv-dd-btn, .dark .sv-dd-btn:focus-visible { box-shadow: 0 0 0 3px rgba(52,211,153,.18); }
    .dark .sv-dd.open .sv-dd-chev { color: #34d399; }
    .dark .sv-dd-panel { background: #0f172a; border-color: #334155; box-shadow: 0 16px 40px -8px rgba(0,0,0,.6); }
    .dark .sv-dd-group { color: #7dd3fc; }
    .dark .sv-dd-item { color: #e2e8f0; }
    .dark .sv-dd-item.active { background: #1e293b; }
    .dark .sv-dd-item.selected, .dark .sv-dd-check { color: #34d399; }
    .dark .sv-dd-panel::-webkit-scrollbar-thumb { background: #475569; }
    `;
    const CHEV = '<svg class="sv-dd-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
    const CHECK = '<svg class="sv-dd-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const nativeValue = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');

    function enhance(sel) {
        if (sel.dataset.svEnhanced) return;
        sel.dataset.svEnhanced = '1';

        const wrap = document.createElement('div');
        wrap.className = 'sv-dd';
        sel.parentNode.insertBefore(wrap, sel);
        wrap.appendChild(sel);
        sel.classList.add('sv-native');
        sel.tabIndex = -1;

        const old = wrap.nextElementSibling;
        if (old && old.classList.contains('pointer-events-none') && old.querySelector('[data-lucide="chevron-down"]')) old.remove();

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sv-dd-btn';
        btn.setAttribute('aria-haspopup', 'listbox');
        btn.setAttribute('aria-expanded', 'false');
        const label = document.createElement('span');
        label.className = 'sv-dd-label';
        btn.appendChild(label);
        btn.insertAdjacentHTML('beforeend', CHEV);

        const panel = document.createElement('div');
        panel.className = 'sv-dd-panel';
        panel.setAttribute('role', 'listbox');

        wrap.appendChild(btn);
        // Panel nằm ở <body> để không bị card (overflow/transform) cắt hoặc che
        document.body.appendChild(panel);

        let items = [];
        let activeIdx = -1;

        function refreshLabel() {
            const opt = sel.options[sel.selectedIndex];
            label.textContent = opt ? opt.text.trim() : '';
            btn.classList.toggle('placeholder', !opt || opt.value === '');
            items.forEach(it => it.el.classList.toggle('selected', it.opt === opt));
        }

        function build() {
            panel.innerHTML = '';
            items = [];
            const addItem = (opt, grouped) => {
                const el = document.createElement('div');
                el.className = 'sv-dd-item' + (grouped ? ' grouped' : '') + (opt.value === '' ? ' muted' : '');
                el.setAttribute('role', 'option');
                const t = document.createElement('span');
                t.textContent = opt.text.trim();
                el.appendChild(t);
                el.insertAdjacentHTML('beforeend', CHECK);
                if (opt.disabled) { el.style.opacity = '.45'; el.style.cursor = 'not-allowed'; }
                el.addEventListener('mousedown', e => e.preventDefault());
                el.addEventListener('click', () => { if (!opt.disabled) choose(opt); });
                el.addEventListener('mouseenter', () => setActive(items.findIndex(i => i.el === el), false));
                panel.appendChild(el);
                items.push({ el, opt });
            };
            Array.from(sel.children).forEach(node => {
                if (node.tagName === 'OPTGROUP') {
                    const g = document.createElement('div');
                    g.className = 'sv-dd-group';
                    g.textContent = node.label;
                    panel.appendChild(g);
                    Array.from(node.children).forEach(o => addItem(o, true));
                } else if (node.tagName === 'OPTION') {
                    addItem(node, false);
                }
            });
            refreshLabel();
        }

        sel._svRebuild = build;

        function positionPanel() {
            const r = btn.getBoundingClientRect();
            const spaceBelow = window.innerHeight - r.bottom - 12;
            const spaceAbove = r.top - 12;

            panel.style.left = r.left + 'px';
            panel.style.width = r.width + 'px';

            if (spaceBelow < 240 && spaceAbove > spaceBelow) {
                panel.style.top = 'auto';
                panel.style.bottom = (window.innerHeight - r.top + 6) + 'px';
                panel.style.maxHeight = Math.min(360, spaceAbove) + 'px';
            } else {
                panel.style.bottom = 'auto';
                panel.style.top = (r.bottom + 6) + 'px';
                panel.style.maxHeight = Math.min(360, Math.max(180, spaceBelow)) + 'px';
            }
        }

        function setActive(i, scroll) {
            if (i < 0 || i >= items.length) return;
            items.forEach(it => it.el.classList.remove('active'));
            activeIdx = i;
            items[i].el.classList.add('active');
            if (scroll) items[i].el.scrollIntoView({ block: 'nearest' });
        }

        function isOpen() { return wrap.classList.contains('open'); }

        function open() {
            if (isOpen() || sel.disabled) return;
            document.querySelectorAll('.sv-dd.open, .sv-dd-panel.open').forEach(d => d.classList.remove('open'));
            wrap.classList.add('open');
            panel.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            positionPanel();
            const cur = items.findIndex(i => i.opt === sel.options[sel.selectedIndex]);
            setActive(cur >= 0 ? cur : 0, true);
        }

        function close() {
            wrap.classList.remove('open');
            panel.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }

        function choose(opt) {
            sel.value = opt.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            close();
            btn.focus();
        }

        function move(step) {
            if (!items.length) return;
            let i = activeIdx;
            for (let n = 0; n < items.length; n++) {
                i = (i + step + items.length) % items.length;
                if (!items[i].opt.disabled) break;
            }
            setActive(i, true);
        }

        btn.addEventListener('click', () => (isOpen() ? close() : open()));
        btn.addEventListener('keydown', e => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!isOpen()) open(); else move(e.key === 'ArrowDown' ? 1 : -1); }
            else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!isOpen()) open(); else if (items[activeIdx]) choose(items[activeIdx].opt); }
            else if (e.key === 'Escape') { close(); }
            else if (e.key === 'Tab') { close(); }
        });

        window.addEventListener('scroll', e => { if (isOpen() && !panel.contains(e.target)) positionPanel(); }, true);
        window.addEventListener('resize', () => { if (isOpen()) positionPanel(); });
        document.addEventListener('click', e => { if (!wrap.contains(e.target) && !panel.contains(e.target)) close(); });

        Object.defineProperty(sel, 'value', {
            configurable: true,
            get() { return nativeValue.get.call(this); },
            set(v) { nativeValue.set.call(this, v); refreshLabel(); }
        });
        sel.addEventListener('change', refreshLabel);
        new MutationObserver(build).observe(sel, { childList: true, subtree: true, characterData: true });

        build();
    }

    function init() {
        if (!document.getElementById('svDropdownStyle')) {
            const st = document.createElement('style');
            st.id = 'svDropdownStyle';
            st.textContent = CSS;
            document.head.appendChild(st);
        }
        document.querySelectorAll('select').forEach(enhance);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();