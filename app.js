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
                        <button type="button" onclick="changeCategoryPage('${cat.slug}', ${currentPage + 1})" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 transition ${nextDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:border-brand-blue cursor-pointer'}">
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
    const img = product.image_url || 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80';

    const details = Array.isArray(product.product_details) ? product.product_details[0] : product.product_details;
    const cartonSize = details?.carton_size || '37 x 45 x 35 cm';
    const ingredients = details?.ingredients || 'Gạo, Nước, Tinh bột sắn, Muối (Đang cập nhật)';
    const usage = details?.usage || 'Chế biến theo tiêu chuẩn hướng dẫn trên bao bì.';
    const storage = details?.storage || 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.';

    document.getElementById('detailProductImage').src = img;
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

    const img = prod.image_url || 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80';
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
                <div onclick="openProductDetailModal('${prod.id}')" class="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center cursor-pointer group">
                    <img src="${img}" alt="${productName}" loading="lazy" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x400/0f172a/ffffff?text=SilViet+Product'">
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
    // Vẫn render để khách luôn có option "Sản phẩm khác" dù DB lỗi
    renderProductSelects();
}

// Đổ sản phẩm vào cả 2 dropdown (Quick Finder + RFQ), cuối danh sách là option "Sản phẩm khác"
function renderProductSelects() {
    const t = i18nData[currentLang] || i18nData.vi;

    [
        { id: 'finderProductSelect', withPacking: false },
        { id: 'rfqProdSelect',        withPacking: true  }
    ].forEach(({ id, withPacking }) => {
        const sel = document.getElementById(id);
        if (!sel) return;

        const prev = sel.value; // giữ lại lựa chọn khi đổi ngôn ngữ
        sel.innerHTML = '';
        sel.add(new Option(t.opt_select_prod, ''));

        globalProducts.forEach(item => {
            const name = (item.name_vi || item.name || item.name_en || 'Sản phẩm xuất khẩu').trim();
            const packing = (withPacking && item.packaging) ? ` (${item.packaging})` : '';
            sel.add(new Option(`${name}${packing}`, item.id));
        });

        sel.add(new Option(t.opt_custom_prod, CUSTOM_PRODUCT_VALUE));

        if (prev && Array.from(sel.options).some(o => o.value === String(prev))) {
            sel.value = prev;
        }
    });

    handleQuickProductChange();
    handleRFQProductChange();
}

// Đổ danh sách thị trường vào cả 2 dropdown
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
    });

    handleQuickMarketChange();
    handleRFQMarketChange();
}

// Khi chọn "Khác": ô dropdown được thay bằng ô nhập ngay tại chỗ (cùng vị trí, cùng kích thước)
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

// Bấm mũi tên ở ô nhập -> quay lại dropdown chọn từ danh sách
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

// Lấy giá trị thị trường cuối cùng (nếu "khác" thì ghép với nội dung khách nhập)
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

// Mở khóa nút khi đã chọn sản phẩm (hoặc đã nhập sản phẩm tự do)
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

// Khi đổi sản phẩm trên Quick Finder: chọn "Sản phẩm khác" thì ô chọn đổi thành ô nhập
function handleQuickProductChange() {
    const prodSelect = document.getElementById('finderProductSelect');
    if (!prodSelect) return;

    applyOtherMode({ selectId: 'finderProductSelect', boxId: 'finderProductBox', wrapId: 'finderCustomWrap',
        inputId: 'finderCustomProduct', isOther: prodSelect.value === CUSTOM_PRODUCT_VALUE, required: false });

    checkFinderFormValid();
}

// Bấm "Nhận Báo Giá (RFQ)" ở Quick Finder -> đồng bộ sang Form RFQ phía dưới và cuộn xuống
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

    // 1. Reset form RFQ trước khi điền dữ liệu mới
    const mainForm = document.getElementById('rfqMainForm');
    if (mainForm) mainForm.reset();

    // 2. Đồng bộ sản phẩm (có sẵn hoặc tự nhập)
    const rfqProdSelect = document.getElementById('rfqProdSelect');
    if (rfqProdSelect) {
        rfqProdSelect.value = finderProdSelect.value;
        handleRFQProductChange();
        if (isCustom) {
            const rfqCustom = document.getElementById('rfqCustomProduct');
            if (rfqCustom) rfqCustom.value = customText;
        }
    }

    // 3. Đồng bộ thị trường đích
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

    // 4. Cuộn xuống form RFQ
    scrollToRFQ();
}

// ================= 7. RFQ FORM =================

// Khi đổi sản phẩm trong RFQ: chọn "Sản phẩm khác" thì ô chọn đổi thành ô nhập
function handleRFQProductChange() {
    const sel = document.getElementById('rfqProdSelect');
    if (!sel) return;

    applyOtherMode({ selectId: 'rfqProdSelect', boxId: 'rfqProdBox', wrapId: 'rfqCustomWrap',
        inputId: 'rfqCustomProduct', isOther: sel.value === CUSTOM_PRODUCT_VALUE, required: true });
}

async function handleMainRFQSubmit(event) {
    event.preventDefault();

    const alertBox = document.getElementById('rfqAlertBox');
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

    try {
        const { error } = await supabaseClient
            .from('rfq_requests')
            .insert([rfqPayload]);

        if (error) throw error;

        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `
                <div>
                    <strong class="font-bold block text-emerald-200">${texts.rfq_success_title}</strong>
                    ${texts.rfq_success_desc}
                </div>
            `;
            alertBox.classList.remove('hidden');
        }

        const mainForm = document.getElementById('rfqMainForm');
        if (mainForm) mainForm.reset();
        handleRFQProductChange();
        handleRFQMarketChange();
        if (alertBox) alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
        console.error('Lỗi khi gửi RFQ:', err.message);
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `<div><strong class="font-bold block text-rose-200">${texts.rfq_err_fail}</strong> Chi tiết: ${err.message}</div>`;
            alertBox.classList.remove('hidden');
        }
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