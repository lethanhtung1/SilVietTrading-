// ================= 1. BIẾN TOÀN CỤC & DỮ LIỆU DỰ PHÒNG =================
let globalProductsForCalc = [];
let globalCompaniesList = [];
let currentFilteredCompanies = [];
let currentLang = 'vi';

const fallbackCompanies = [
    { id: 1, name: "SilViet Sourcing Hub - Bình Dương", location: "Bình Dương, Việt Nam", capacity: "50,000 m²" },
    { id: 2, name: "SilViet Factory - Long An", location: "Long An, Việt Nam", capacity: "35,000 m²" }
];

const i18nData = {
    vi: {
        top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong",
        nav_products: "Sản Phẩm Chủ Lực",
        nav_calc: "Tính CBM & Container",
        nav_services: "Dịch Vụ OEM/ODM",
        nav_rfq: "Liên Hệ RFQ",
        btn_rfq: "Gửi Yêu Cầu Báo Giá (RFQ)",
        
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
        finder_sub: "Tra cứu thông số, Nhà máy & nhận báo giá trực tiếp",finder_label_1: "Nhóm Hàng Cần Sourcing / OEM",
        finder_select_prod: "Chọn sản phẩm OEM / Sourcing",
        finder_label_2: "Chọn Nhà Máy Đối Tác (Verified Supplier)",
        finder_default_prod: "Vui lòng chọn sản phẩm trước",
        finder_label_certs: "Chứng chỉ & Tiêu chuẩn nhà máy:",
        finder_default_certs: "Chọn nhà máy để xem chứng chỉ...",
        finder_label_3: "Thị Trường Xuất Khẩu Đích",
        finder_default_market: "Chọn nhà máy để xem thị trường phù hợp",
        finder_btn_submit: "Kết Nối Nhà Máy & Nhận RFQ",
        cat_badge: "Chủ Lực Xuất Khẩu",
        cat_title: "Danh Mục Sản Phẩm Kết Nối B2B",
        cat_desc: "Tất cả sản phẩm đều được chuẩn hóa bao bì, nhãn mác đa ngôn ngữ và hồ sơ chứng nhận đầy đủ.",
        
        // Calculator
        calc_tag: "Công Cụ Ước Tính B2B",
        calc_title: "Tính Thể Tích (CBM) & Tải Trọng Container",
        calc_sub: "Hỗ trợ đối tác tính toán số lượng Container 20ft / 40HC cần thiết cho đơn hàng.",
        c1_head: "1. Chọn Mặt Hàng & Số Lượng",
        c1_select_prod: "Dòng Sản Phẩm Sourcing:",
        c1_carton_qty: "Tổng số Thùng Carton (hoặc Tổng số Đôi giày):",
        c2_head: "2. Kết Quả Ước Tính Xuất Khẩu",
        res_cbm: "Tổng Thể Tích (CBM):",
        res_gw: "Tổng Khối Lượng (GW Kg):",
        btn_calc_rfq: "Gửi Yêu Cầu Báo Giá Theo Số Lượng Này",

        // Services
        serv_sub: "Dịch Vụ Gia Giá Trị Gia Tăng",
        serv_title: "Dịch Vụ Hỗ Trợ Dành Cho B2B Buyers",
        s1_title: "Gia Công OEM & Private Labeling",
        s1_desc: "In ấn thiết kế bao bì thương hiệu riêng cho hủ tiếu, bún phở, nhãn lon nước dừa & ép logo thương hiệu trên giày dép theo chính xác nhận diện của khách hàng.",
        s2_title: "Kiểm Định QC & Đóng Gói Chuẩn Export",
        s2_desc: "Đội ngũ kỹ sư QC giám sát dây chuyền, đo lường độ ẩm thực phẩm khô, đo độ bám dính đế giày và test độ bền thùng carton chống móp vỡ đường biển.",
        s3_title: "Thủ Tục Hải Quan, C.O & Freight",
        s3_desc: "Xử lý toàn bộ chứng từ kiểm dịch thực vật (Phytosanitary), chứng nhận FDA, C/O ưu đãi thuế xuất khẩu và booking container giao hàng FOB/CIF/DDP.",

        // RFQ
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

        // Footer
        foot_desc: "Đơn vị kết nối thương mại & xuất khẩu B2B thuộc SilViet Group. Chuyên dòng thực phẩm khô, nước dừa đóng lon & giày dép xuất khẩu sang EU, US, Middle East.",
        foot_products: "Dòng Sản Phẩm Chủ Lực",
        foot_links: "Điều Hướng",
        foot_contact: "Trụ Sở Sourcing Hub"
    },
    en: {
        top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong",
        nav_products: "Core Products",
        nav_calc: "CBM & Container Calc",
        nav_services: "OEM/ODM Services",
        nav_rfq: "Inquire RFQ",
        btn_rfq: "Request a Quote (RFQ)",
        
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
        finder_sub: "Look up specs, factories & get instant quotes",
        finder_label_1: "Sourcing / OEM Product Category",
        finder_select_prod: "Select OEM / Sourcing product",
        finder_label_2: "Verified Partner Supplier",
        finder_default_prod: "Please select a product first",
        finder_label_certs: "Factory Certifications & Standards:",
        finder_default_certs: "Select a factory to view certifications...",
        finder_label_3: "Target Export Market",
        finder_default_market: "Select a factory to view matching markets",
        finder_btn_submit: "Connect Factory & Get RFQ",
        cat_badge: "Core Export Highlights",
        cat_title: "B2B Connected Product Catalog",
        cat_desc: "All products feature standardized multi-language packaging, labeling, and complete certification records.",
        
        // Calculator
        calc_tag: "B2B Estimation Tool",
        calc_title: "CBM Volume & Container Load Calculator",
        calc_sub: "Help partners estimate the required 20ft / 40HC containers for orders.",
        c1_head: "1. Select Product & Quantity",
        c1_select_prod: "Sourcing Product Line:",
        c1_carton_qty: "Total Carton Boxes (or Total Shoe Pairs):",
        c2_head: "2. Export Estimation Results",
        res_cbm: "Total Volume (CBM):",
        res_gw: "Total Gross Weight (GW Kg):",
        btn_calc_rfq: "Request Quote Based on This Quantity",

        // Services
        serv_sub: "Value-Added Services",
        serv_title: "Support Services for B2B Buyers",
        s1_title: "OEM & Private Label Manufacturing",
        s1_desc: "Custom packaging design and printing for rice noodles, coconut water cans, and brand embossing on footwear matching buyer specifications.",
        s2_title: "QC Inspection & Export Packaging",
        s2_desc: "Dedicated QC engineers supervise production lines, measure moisture content in dry foods, peel strength in footwear, and test export carton durability.",
        s3_title: "Customs Clearance, C.O & Freight",
        s3_desc: "Handling all Phytosanitary certificates, FDA registration, preferential export C/O, and container booking for FOB/CIF/DDP deliveries.",

        // RFQ
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

        // Footer
        foot_desc: "B2B trade and export connector under SilViet Group. Specializing in dry foods, canned coconut water, and export footwear to the EU, US, and Middle East.",
        foot_products: "Core Product Lines",
        foot_links: "Quick Links",
        foot_contact: "Sourcing Hub Headquarters"
    }
};

// Hàm cập nhật chữ tĩnh theo ngôn ngữ
function updateStaticTexts(lang) {
    const texts = i18nData[lang];
    if (!texts) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });
}

// ================= 2. KHỞI TẠO KHI TẢI TRANG =================
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo icon Lucide
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Tải dữ liệu danh mục & sản phẩm động từ Supabase
    loadDynamicCategories();
    loadProductsIntoCalculator();
    loadAllSystemData();

    // Khởi tạo thư viện AOS Animation nếu có
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

// Chuyển ngôn ngữ
// Chuyển ngôn ngữ
function toggleLanguage() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';

    const langLabel = document.getElementById('langLabel');
    if (langLabel) {
        langLabel.textContent = currentLang === 'vi' ? 'VI / EN' : 'EN / VI';
    }

    // Gọi hàm cập nhật toàn bộ chữ tĩnh trên HTML
    updateStaticTexts(currentLang);

    // Load lại dữ liệu động từ Supabase (Sản phẩm & Danh mục)
    if (typeof loadDynamicCategories === 'function') {
        loadDynamicCategories();
    }
    if (typeof loadProductsIntoCalculator === 'function') {
        loadProductsIntoCalculator();
    }
}
// Menu Mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

// Chuyển Tab Danh Mục Sản Phẩm (Đã gộp chung 1 hàm duy nhất)
function switchCategoryTab(targetSlug) {
    document.querySelectorAll('.cat-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.cat-tab-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-lg');
        b.classList.add('bg-slate-800', 'text-slate-300', 'font-medium');
    });

    const activeContent = document.getElementById(`catContent-${targetSlug}`);
    if (activeContent) activeContent.classList.remove('hidden');

    const activeBtn = document.getElementById(`tabBtn-${targetSlug}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-300', 'font-medium');
        activeBtn.classList.add('bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-lg');
    }
}

// Nút Xem Thêm
function loadMoreProducts() {
    alert("Đang mở rộng toàn bộ danh mục sản phẩm B2B xuất khẩu...");
}

// Cuộn mượt đến section RFQ
function scrollToRFQ() {
    const rfqSection = document.getElementById('rfq-form') || document.getElementById('rfq');
    if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Hàm mở Modal / Cuộn xuống RFQ khi bấm nút yêu cầu báo giá trên card
window.openRfqModal = function(productIdOrName) {
    scrollToRFQ();
};

// Điền nhanh tên sản phẩm vào form RFQ khi bấm nút
function requestQuoteFor(productName) {
    const selectEl = document.getElementById('rfqProdSelect');
    if (selectEl && productName) {
        for (let i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].text.includes(productName) || selectEl.options[i].value.includes(productName)) {
                selectEl.selectedIndex = i;
                break;
            }
        }
    }
    scrollToRFQ();
}


// ================= 4. SUPABASE DATA & RENDER PRODUCTS =================

// Tải danh mục động & sản phẩm từ Supabase
async function loadDynamicCategories() {
    const tabsContainer = document.getElementById('categoryTabsContainer');
    const contentsContainer = document.getElementById('categoryContentsContainer');

    if (!tabsContainer || !contentsContainer) return;
    if (!window.dbClient) {
        console.error("window.dbClient chưa sẵn sàng!");
        return;
    }

    try {
        // Lấy categories và products kèm theo product_details
        const [catRes, prodRes] = await Promise.all([
            window.dbClient.from('categories').select('*'),
            window.dbClient.from('products').select('*, product_details(*)').order('created_at', { ascending: true })
        ]);

        if (catRes.error) throw catRes.error;
        if (prodRes.error) throw prodRes.error;

        const categories = catRes.data || [];
        const products = prodRes.data || [];

        // Đồng bộ lưu biến toàn cục cho Popup
        window.allProductsData = products;

        // Kiểm tra ngôn ngữ hiện tại
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

            // Lấy tên danh mục theo ngôn ngữ (Ưu tiên name_en nếu là tiếng Anh)
            const categoryDisplayName = isEn ? (cat.name_en || cat.name) : cat.name;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = `tabBtn-${cat.slug}`;
            btn.onclick = () => switchCategoryTab(cat.slug);
            btn.className = `cat-tab-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                isFirst 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg' 
                    : 'bg-slate-800 text-slate-300 hover:text-white font-medium'
            }`;
            btn.innerHTML = `<span>${cat.icon || '📦'}</span> ${categoryDisplayName}`;
            tabsContainer.appendChild(btn);

            const gridDiv = document.createElement('div');
            gridDiv.id = `catContent-${cat.slug}`;
            gridDiv.className = `cat-content grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isFirst ? '' : 'hidden'}`;

            const catProducts = products.filter(p => p.category_id === cat.id || p.category_slug === cat.slug);

            if (catProducts.length > 0) {
                gridDiv.innerHTML = catProducts.map(prod => renderProductCard(prod)).join('');
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

// ================= HÀM XỬ LÝ POPUP CHI TIẾT =================

function openProductDetailModal(productId) {
    const product = (window.allProductsData || globalProductsForCalc || []).find(p => String(p.id) === String(productId));
    if (!product) return;

    const name = product.name_vi || product.name_en || product.name || 'Sản phẩm xuất khẩu';
    const packaging = product.packaging || 'Thùng 10kg / PE Bag';
    const specsDetail = product.specs_detail || product.specs || 'Chuẩn xuất khẩu B2B';
    const specsCert = product.specs_cert || 'FDA, ISO 22000';
    const img = product.image_url || 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80';

    // Lấy dữ liệu từ bảng product_details (join 1-1)
    const details = Array.isArray(product.product_details) ? product.product_details[0] : product.product_details;
    
    // Ưu tiên lấy carton_size từ bảng product_details, nếu chưa có thì dùng giá trị mặc định
    const cartonSize = details?.carton_size || '37 x 45 x 35 cm';

    const ingredients = details?.ingredients || 'Gạo, Nước, Tinh bột sắn, Muối (Đang cập nhật)';
    const usage = details?.usage || 'Chế biến theo tiêu chuẩn hướng dẫn trên bao bì.';
    const storage = details?.storage || 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.';

    // Đổ dữ liệu lên Modal Pro
    document.getElementById('detailProductImage').src = img;
    document.getElementById('detailThumb1').src = img;
    document.getElementById('detailProductName').innerText = name;
    document.getElementById('detailProductTag').innerText = product.category || 'SOURCING';
    
    // Đổ các thông số kỹ thuật
    document.getElementById('detailProductType').innerText = specsDetail;
    document.getElementById('detailProductPackaging').innerText = packaging;
    document.getElementById('detailProductCartonSize').innerText = cartonSize;
    document.getElementById('detailProductBarcode').innerText = specsCert;

    // Đổ thông tin chi tiết sản phẩm phía dưới
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


// ================= CẬP NHẬT RENDER CARD CÓ GẮN CLICK MỞ POPUP =================
function renderProductCard(prod) {
    // 1. Kiểm tra trạng thái ngôn ngữ (mặc định là 'vi' nếu chưa khai báo)
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';

    // 2. Lấy dữ liệu theo đúng ngôn ngữ đang chọn
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

    // 3. Các nhãn văn bản đa ngôn ngữ
    const labels = {
        clickDetail: isEn ? 'Click to view details' : 'Bấm xem chi tiết',
        packaging: isEn ? 'Packaging:' : 'Quy cách:',
        specs: isEn ? 'Specs:' : 'Thông số:',
        cert: isEn ? 'Certifications:' : 'Chứng nhận:',
        btnQuote: isEn ? 'Request Specs & Quote →' : 'Yêu Cầu Specs & Báo Giá →'
    };

    return `
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-amber-500/50 transition duration-300 flex flex-col justify-between">
            <div>
                <!-- Click vào ảnh để mở Popup chi tiết -->
                <div onclick="openProductDetailModal('${prod.id}')" class="relative h-64 overflow-hidden bg-slate-950 flex items-center justify-center p-2 cursor-pointer group">
                    <img src="${img}" alt="${productName}" loading="lazy" class="w-full h-full object-contain group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/0f172a/ffffff?text=SilViet+Product'">
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        ${prod.tag || 'SOURCING'}
                    </span>
                    <span class="absolute bottom-2 left-2 bg-slate-900/80 text-slate-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition z-10">${labels.clickDetail}</span>
                </div>

                <!-- Click vào tiêu đề để mở Popup chi tiết -->
                <div class="p-5 space-y-2">
                    <h3 onclick="openProductDetailModal('${prod.id}')" class="text-white font-bold text-base leading-snug cursor-pointer hover:text-amber-400 transition">${productName}</h3>
                    <p class="text-slate-400 text-xs line-clamp-2">${desc}</p>
                    
                    <div class="pt-3 space-y-1.5 text-xs border-t border-slate-700/50 mt-3 text-slate-300">
                        <div class="flex justify-between"><span>${labels.packaging}</span> <span class="font-bold text-white">${packing}</span></div>
                        <div class="flex justify-between"><span>${labels.specs}</span> <span class="font-bold text-white">${detail}</span></div>
                        <div class="flex justify-between"><span>${labels.cert}</span> <span class="font-bold text-emerald-400">${cert}</span></div>
                    </div>
                </div>
            </div>

            <!-- Nút bấm Yêu Cầu Specs & Báo Giá -->
            <div class="p-5 pt-0">
                <button type="button" onclick="requestQuoteFor('${safeName}')" class="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold text-xs transition duration-200 text-center block cursor-pointer">
                    ${labels.btnQuote}
                </button>
            </div>
        </div>
    `;
}
// ================= 5. CBM & CONTAINER CALCULATOR =================

// Tải sản phẩm vào CBM Calculator và Form RFQ
async function loadProductsIntoCalculator() {
    try {
        // Lấy sản phẩm kèm theo bảng chi tiết product_details
        const { data: products, error } = await window.dbClient
            .from('products')
            .select('*, product_details(*)')
            .order('created_at', { ascending: true });

        if (error) throw error;
        
        // Lưu toàn bộ vào biến toàn cục để Popup tra cứu dữ liệu
        globalProductsForCalc = products || [];
        window.allProductsData = products || [];

        const calcSelectEl = document.getElementById('calcProductType');
        const rfqSelectEl = document.getElementById('rfqProdSelect');

        if (calcSelectEl) calcSelectEl.innerHTML = '';
        if (rfqSelectEl) rfqSelectEl.innerHTML = '<option value=""> Chọn sản phẩm quan tâm </option>';

        globalProductsForCalc.forEach((item, index) => {
            const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm xuất khẩu').trim();
            const packingInfo = item.packaging ? ` (${item.packaging})` : '';
            const fullLabel = `${productName}${packingInfo}`;

            if (calcSelectEl) {
                const opt1 = document.createElement('option');
                opt1.value = index;
                opt1.text = fullLabel;
                if (index === 0) opt1.selected = true;
                calcSelectEl.appendChild(opt1);
            }

            if (rfqSelectEl) {
                const opt2 = document.createElement('option');
                opt2.value = productName;
                opt2.text = fullLabel;
                rfqSelectEl.appendChild(opt2);
            }
        });

        runCbmCalculator();
    } catch (err) {
        console.error('Lỗi tải sản phẩm cho calculator:', err.message);
    }
}
// Tính toán CBM & Container
function runCbmCalculator() {
    const selectEl = document.getElementById('calcProductType');
    const cartonInput = document.getElementById('calcCartonInput');
    const qty = cartonInput ? parseFloat(cartonInput.value) || 0 : 1000;

    let unitCbm = 0.038; 
    let unitGw = 7.5; 

    if (selectEl && globalProductsForCalc && globalProductsForCalc[selectEl.value]) {
        const prod = globalProductsForCalc[selectEl.value];
        unitCbm = parseFloat(prod.cbm_per_unit || 0.038);
        unitGw = parseFloat(prod.gw_per_unit || 7.5);
    }

    const totalCbm = (qty * unitCbm).toFixed(1);
    const totalGw = Math.round(qty * unitGw).toLocaleString('en-US');

    let contRec = "Gom hàng lẻ LCL";
    if (totalCbm > 65) {
        const cont40Count = Math.ceil(totalCbm / 65);
        contRec = `${cont40Count} x 40ft HC`;
    } else if (totalCbm >= 25) {
        contRec = "1 x 40ft HC";
    } else if (totalCbm >= 15) {
        contRec = "1 x 20ft FCL";
    }

    const cbmEl = document.getElementById('resTotalCbm');
    const gwEl = document.getElementById('resTotalGw');
    const contEl = document.getElementById('resContRecommendation');
    const leadEl = document.getElementById('resLeadTime');

    if (cbmEl) cbmEl.innerText = `${totalCbm} CBM`;
    if (gwEl) gwEl.innerText = `${totalGw} Kg`;
    if (contEl) contEl.innerText = contRec;
    if (leadEl) leadEl.innerText = (totalCbm > 50) ? "20 - 25 Ngày" : "15 - 20 Ngày";
}

// Đồng bộ kết quả tính toán CBM xuống Form RFQ
function sendCalcToRFQ() {
    const cartonInput = document.getElementById('calcCartonInput');
    const qty = cartonInput ? cartonInput.value : '1000';
    const cbmText = document.getElementById('resTotalCbm')?.innerText || '';
    const contText = document.getElementById('resContRecommendation')?.innerText || '';
    
    const calcProductSelect = document.getElementById('calcProductType');
    let selectedProductName = '';
    
    if (calcProductSelect && globalProductsForCalc && globalProductsForCalc.length > 0) {
        const prod = globalProductsForCalc[calcProductSelect.value];
        if (prod) selectedProductName = (prod.name_vi || prod.name || prod.name_en || '').trim();
    }

    const rfqProdSelect = document.getElementById('rfqProdSelect');
    if (rfqProdSelect && selectedProductName) {
        rfqProdSelect.value = selectedProductName;
    }

    const qtyInput = document.getElementById('rfqQty');
    if (qtyInput) qtyInput.value = `${qty} Thùng (~${cbmText}, Khuyên dùng: ${contText})`;

    const detailsInput = document.getElementById('rfqDetails');
    if (detailsInput) {
        detailsInput.value = `Yêu cầu từ công cụ tính CBM. Sản phẩm: ${selectedProductName}. Số lượng: ${qty} thùng. Thể tích: ${cbmText}. Khuyên dùng: ${contText}.`;
    }

    scrollToRFQ();
}


// ================= 6. QUICK SOURCING FINDER & COMPANIES =================

async function loadAllSystemData() {
    try {
        const [prodRes, compRes] = await Promise.all([
            window.dbClient.from('products').select('*').order('created_at', { ascending: true }),
            window.dbClient.from('companies').select('*').order('name', { ascending: true })
        ]);

        if (!prodRes.error && prodRes.data) globalProductsForCalc = prodRes.data;
        if (!compRes.error && compRes.data && compRes.data.length > 0) {
            globalCompaniesList = compRes.data;
        } else {
            globalCompaniesList = fallbackCompanies;
        }

        // Đổ dữ liệu vào Quick Finder sản phẩm (Hero)
        const finderProdSelect = document.getElementById('finderProductSelect');
        if (finderProdSelect && globalProductsForCalc.length > 0) {
            finderProdSelect.innerHTML = '<option value=""> Chọn sản phẩm OEM / Sourcing </option>';
            globalProductsForCalc.forEach((item, index) => {
                const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm').trim();
                const opt = document.createElement('option');
                opt.value = index;
                opt.text = productName;
                finderProdSelect.appendChild(opt);
            });
        }

        // Đổ dữ liệu nhà máy vào Form RFQ
        const rfqSupplierEl = document.getElementById('rfqSupplier');
        if (rfqSupplierEl) {
            rfqSupplierEl.innerHTML = '<option value="">Chọn nhà máy đối tác </option>';
            globalCompaniesList.forEach((comp) => {
                const opt = document.createElement('option');
                opt.value = comp.name;
                opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
                rfqSupplierEl.appendChild(opt);
            });
        }
    } catch (err) {
        console.error('Lỗi tải dữ liệu hệ thống:', err.message);
        globalCompaniesList = fallbackCompanies;
    }
}

// Lọc nhà máy theo sản phẩm trên Quick Finder
function handleQuickProductChange() {
    const prodSelect = document.getElementById('finderProductSelect');
    const supplierSelect = document.getElementById('quickSupplierSelect');
    if (!prodSelect || !supplierSelect) return;

    const selectedIndex = prodSelect.value;
    if (selectedIndex === "") {
        supplierSelect.innerHTML = '<option value=""> Vui lòng chọn sản phẩm trước </option>';
        handleQuickSupplierChange();
        return;
    }

    const selectedProduct = globalProductsForCalc[selectedIndex];
    const productName = (selectedProduct?.name_vi || selectedProduct?.name || '').toLowerCase();

    if (selectedProduct && selectedProduct.company_id) {
        currentFilteredCompanies = globalCompaniesList.filter(c => c.id === selectedProduct.company_id);
    } else {
        currentFilteredCompanies = [];
    }

    if (currentFilteredCompanies.length === 0 && globalCompaniesList.length > 0) {
        if (productName.includes('bún') || productName.includes('phở') || productName.includes('hủ tiếu')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('an giang') || c.name.toLowerCase().includes('food'));
        } else if (productName.includes('dừa') || productName.includes('nước')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('bến tre') || c.name.toLowerCase().includes('coconut'));
        } else if (productName.includes('giày') || productName.includes('dép')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('saigon') || c.name.toLowerCase().includes('footwear'));
        }
        if (currentFilteredCompanies.length === 0) currentFilteredCompanies = globalCompaniesList;
    }

    supplierSelect.innerHTML = '';
    currentFilteredCompanies.forEach((comp, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
        supplierSelect.appendChild(opt);
    });

    if (currentFilteredCompanies.length > 0) {
        supplierSelect.selectedIndex = 0;
        handleQuickSupplierChange();
    }
}

// Hiển thị chứng chỉ khi chọn nhà máy trên Quick Finder
function handleQuickSupplierChange() {
    const supplierSelect = document.getElementById('quickSupplierSelect');
    const certsDisplayEl = document.getElementById('quickCertsDisplay');
    const marketSelect = document.getElementById('quickTargetMarket');

    if (!supplierSelect || supplierSelect.value === "" || currentFilteredCompanies.length === 0) {
        if (certsDisplayEl) certsDisplayEl.innerHTML = '<span class="text-[10px] text-slate-400">Chọn nhà máy để xem chứng chỉ...</span>';
        if (marketSelect) marketSelect.innerHTML = '<option value="">Chọn nhà máy để xem thị trường </option>';
        return;
    }

    const selectedComp = currentFilteredCompanies[parseInt(supplierSelect.value)];
    if (!selectedComp) return;

    if (certsDisplayEl) {
        const certs = selectedComp.certs || [];
        certsDisplayEl.innerHTML = certs.length > 0 
            ? certs.map(c => `<span class="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-md">✓ ${c}</span>`).join(' ')
            : '<span class="text-[10px] text-slate-400">Đã kiểm định chuẩn xuất khẩu</span>';
    }

    if (marketSelect) {
        marketSelect.innerHTML = '';
        const markets = selectedComp.target_markets || ['Mỹ / Canada (FDA)', 'EU / UK', 'Nhật / Hàn'];
        markets.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.text = m;
            marketSelect.appendChild(opt);
        });
    }
}

// Submit Quick Finder sang Form RFQ
function handleHeroFinder(event) {
    event.preventDefault();
    const finderProdSelect = document.getElementById('finderProductSelect');
    const quickSupplierSelect = document.getElementById('quickSupplierSelect');
    const quickMarketSelect = document.getElementById('quickTargetMarket');
    const volume = document.getElementById('finderVolume')?.value;

    const rfqProdSelect = document.getElementById('rfqProdSelect');
    if (finderProdSelect && finderProdSelect.value !== "" && rfqProdSelect) {
        const prod = globalProductsForCalc[finderProdSelect.value];
        if (prod) rfqProdSelect.value = (prod.name_vi || prod.name || prod.name_en || '').trim();
    }

    const rfqSupplier = document.getElementById('rfqSupplier');
    if (quickSupplierSelect && quickSupplierSelect.value !== "" && rfqSupplier) {
        const comp = currentFilteredCompanies[parseInt(quickSupplierSelect.value)];
        if (comp) rfqSupplier.value = comp.name;
    }

    const rfqTargetMarket = document.getElementById('rfqTargetMarket');
    if (quickMarketSelect && quickMarketSelect.value !== "" && rfqTargetMarket) {
        rfqTargetMarket.value = quickMarketSelect.value;
    }

    const rfqQty = document.getElementById('rfqQty');
    if (rfqQty && volume) rfqQty.value = volume;

    scrollToRFQ();
}


// ================= 7. RFQ FORM SUBMISSION (SUPABASE) =================

async function handleMainRFQSubmit(event) {
    event.preventDefault();

    const alertBox = document.getElementById('rfqAlertBox');
    const companyName = document.getElementById('rfqComp')?.value.trim() || '';
    const email = document.getElementById('rfqMail')?.value.trim() || '';
    const phone = document.getElementById('rfqTel')?.value.trim() || '';
    const incoterm = document.getElementById('rfqIncoterm')?.value || 'FOB';
    const productCategory = document.getElementById('rfqProdSelect')?.value || '';
    let supplier = document.getElementById('rfqSupplier')?.value || '';
    const quantity = document.getElementById('rfqQty')?.value.trim() || '';
    const targetMarket = document.getElementById('rfqTargetMarket')?.value || '';
    const shippingMethod = document.getElementById('rfqShippingMethod')?.value || '';
    const details = document.getElementById('rfqDetails')?.value.trim() || '';

    const rfqPayload = {
        full_name: companyName,
        email: email,
        phone: phone,
        incoterm: incoterm,
        product_category: productCategory,
        company_name: supplier,
        quantity: quantity,
        target_market: targetMarket,
        shipping_method: shippingMethod,
        notes: details,
        status: 'pending'
    };

    const supabaseClient = window.dbClient || window.supabase;
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
        console.error('Supabase client chưa được khởi tạo!');
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `<strong class="font-bold">Lỗi Kết Nối!</strong> Không tìm thấy client Supabase.`;
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
                    <strong class="font-bold block text-emerald-200">Gửi Yêu Cầu Báo Giá (RFQ) Thành Công!</strong>
                    SilViet Sourcing đã tiếp nhận thông tin và sẽ gửi bảng Specs & báo giá chi tiết qua email cho bạn.
                </div>
            `;
            alertBox.classList.remove('hidden');
        }

        const mainForm = document.getElementById('rfqMainForm');
        if (mainForm) mainForm.reset();
        if (alertBox) alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
        console.error('Lỗi khi gửi RFQ:', err.message);
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg";
            alertBox.innerHTML = `<div><strong class="font-bold block text-rose-200">Gửi RFQ Thất Bại!</strong> Chi tiết: ${err.message}</div>`;
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

    // Sau 4.5 giây tự động mờ dần intro và bật video
    setTimeout(() => {
        finishIntro();
    }, 4500);
});

function finishIntro() {
    const intro = document.getElementById("introSplash");
    const video = document.getElementById("companyIntroVideo");

    if (intro) {
        intro.style.transition = "opacity 1.2s ease";
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.remove(); // Xóa hẳn màn hình intro khỏi DOM
        }, 1200);
    }

    if (video) {
        video.muted = true; 
        video.play().catch(error => {
            console.log("Trình duyệt chặn autoplay:", error);
        });
    }
}

function skipIntro() {
    finishIntro();
}

// Hàm bật / tắt âm thanh video nền
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
// Cập nhật các chữ tĩnh trên giao diện dựa theo từ điển i18nData
function updateStaticTexts(lang) {
    const texts = i18nData[lang];
    if (!texts) return;

    // Quét tất cả các thẻ có gắn thuộc tính data-i18n để đổi text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });
}