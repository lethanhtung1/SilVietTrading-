let globalProductsForCalc = [];
let globalCompaniesList = [];
let currentFilteredCompanies = [];
        // Translations Data Object
        // Dữ liệu dự phòng hệ thống B2B
const fallbackCompanies = [
    { id: 1, name: "SilViet Sourcing Hub - Bình Dương", location: "Bình Dương, Việt Nam", capacity: "50,000 m²" },
    { id: 2, name: "SilViet Factory - Long An", location: "Long An, Việt Nam", capacity: "35,000 m²" }
];
        const i18nData = {
            vi: {
                top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong • Dong Nai • Hanoi",
                nav_products: "Sản Phẩm Chủ Lực",
                nav_calc: "Tính CBM & Container",
                nav_services: "Dịch Vụ OEM/ODM",
                nav_rfq: "Liên Hệ RFQ",
                btn_rfq: "Gửi Yêu Cầu Báo Giá (RFQ)",
                hero_badge: "B2B Sourcing & Export Connector - Vietnam to Worldwide",
                hero_title_1: "Cầu Nối Xuất Khẩu B2B",
                hero_title_2: "Nông Sản Khô, Đồ Uống & Giày Dép Việt",
                hero_sub: "SilViet kết nối trực tiếp các nhà mua hàng quốc tế với mạng lưới nhà máy chuẩn ISO/HACCP/FDA tại Việt Nam: Hủ tiếu - Bún phở sấy khô, Nước dừa đóng lon & Giày dép xuất khẩu OEM/ODM.",
                stat_factories: "Nhà Máy Đối Tác",
                stat_containers: "Container / Năm",
                stat_qc: "Kiểm Định QC Chuẩn",
                finder_title: "Quick Sourcing Finder",
                finder_sub: "Tra cứu thông số & nhận báo giá theo dòng sản phẩm",
                label_category: "Nhóm Hàng Cần Sourcing",
                label_market: "Thị Trường Đích",
                label_order_type: "Loại Đơn Hàng",
                label_vol: "Sản Lượng Dự Kiến (Thùng / Đôi / Cont)",
                btn_find_now: "Tìm Nhà Máy & Nhận RFQ",
                cat_tag: "Chủ Lực Xuất Khẩu",
                cat_title: "Danh Mục Sản Phẩm Kết Nối B2B",
                cat_desc: "Tất cả sản phẩm đều được chuẩn hóa bao bì, nhãn mác đa ngôn ngữ và hồ sơ chứng nhận đầy đủ.",
                tab_noodles: "1. Thực Phẩm Khô & Bún Phở",
                tab_beverages: "2. Nước Dừa & Đồ Uống",
                tab_footwear: "3. Giày Dép & Footwear",
                p1_n_title: "Hủ Tiếu Gói Khô Xuất Khẩu",
                p1_n_desc: "Sợi hủ tiếu bột gạo dai tự nhiên, không hàn the, không chất bảo quản tẩy trắng.",
                p2_n_title: "Bánh Phở Khô Chuẩn Vị Việt",
                p2_n_desc: "Bánh phở vuông/dẹp sấy khô nhiệt độ thấp, giữ nguyên hương vị gạo thơm khi nấu.",
                p3_n_title: "Bún Bò Gói Khô & Bún Tươi Sấy",
                p3_n_desc: "Sợi bún tròn to/nhỏ chuẩn bún bò Huế, ngâm luộc nhanh mềm dẻo như bún tươi.",
                p1_b_title: "Nước Dừa Tươi Nguyên Chất Đóng Lon",
                p1_b_desc: "Dừa xiêm Bến Tre thanh ngọt tự nhiên, không bổ sung đường hóa học, tiệt trùng UHT.",
                p2_b_title: "Nước Dừa Vị Trái Cây & Dừa Cơm",
                p2_b_desc: "Kết hợp nước dừa cùng vị Xoài, Chanh Dây, Dứa hoặc thêm thạch cơm dừa (Coconut pulp).",
                p3_b_title: "Nước Ép Trái Cây Đóng Lon (Mãng Cầu, Chanh Dây)",
                p3_b_desc: "Nước ép trái cây nhiệt đới tươi nguyên chất cô đặc, giàu vitamin tự nhiên.",
                p1_f_title: "Giày Thể Thao & Sneaker Xuất Khẩu",
                p1_f_desc: "Thiết kế êm ái, đế Eva/Rubber bám dính tốt, vải Flyknit thoáng khí gia công chuẩn xuất khẩu.",
                p2_f_title: "Giày Sandal & Dép Quai Hậu Nam/Nữ",
                p2_f_desc: "Sandal dã ngoại, sandal thời trang quai dù D-ring chống nước, siêu bền nhẹ.",
                p3_f_title: "Giày Da Tây & Loafer Công Sở OEM",
                p3_f_desc: "Gia công giày da thật (Genuine Leather) & Microfiber cao cấp form chuẩn Châu Âu.",
                btn_req_spec: "Yêu Cầu Specs & Báo Giá",
                calc_tag: "Công Cụ Ước Tính B2B",
                calc_title: "Tính Thể Tích (CBM) & Tải Trọng Container",
                calc_sub: "Hỗ trợ đối tác tính toán số lượng Container 20ft / 40HC cần thiết cho đơn hàng.",
                c1_head: "1. Chọn Mặt Hàng & Số Lượng",
                c1_select_prod: "Dòng Sản Phẩm Sourcing:",
                c1_carton_qty: "Tổng số Thùng Carton (hoặc Tổng số Đôi giày):",
                c2_head: "2. Kết Quả Ước Tính Xuất Khẩu",
                res_cbm: "Tổng Thể Tích (CBM):",
                res_gw: "Tổng Khối Lượng (GW Kg):",
                res_cont: "Khuyên dùng Container:",
                res_leadtime: "Thời gian sản xuất dự kiến:",
                btn_calc_rfq: "Gửi Yêu Cầu Báo Giá Theo Số Lượng Này",
                serv_sub: "Dịch Vụ Gia Giá Trị Gia Tăng",
                serv_title: "Dịch Vụ Hỗ Trợ Dành Cho B2B Buyers",
                s1_title: "Gia Công OEM & Private Labeling",
                s1_desc: "In ấn thiết kế bao bì thương hiệu riêng cho hủ tiếu, bún phở, nhãn lon nước dừa & ép logo thương hiệu trên giày dép theo chính xác nhận diện của khách hàng.",
                s2_title: "Kiểm Định QC & Đóng Gói Chuẩn Export",
                s2_desc: "Đội ngũ kỹ sư QC giám sát dây chuyền, đo lường độ ẩm thực phẩm khô, đo độ bám dính đế giày và test độ bền thùng carton chống móp vỡ đường biển.",
                s3_title: "Thủ Tục Hải Quan, C.O & Freight",
                s3_desc: "Xử lý toàn bộ chứng từ kiểm dịch thực vật (Phytosanitary), chứng nhận FDA, C/O ưu đãi thuế xuất khẩu và booking container giao hàng FOB/CIF/DDP.",
                rfq_tag: "Official RFQ Submission",
                rfq_title: "Gửi Yêu Cầu Báo Giá Sourcing & Export",
                rfq_sub: "Điền thông tin bên dưới để nhận bảng thông số Specs & Báo giá chi tiết từ SilViet Sourcing.",
                rfq_company: "Tên Công Ty / Doanh Nghiệp Buyers *",
                rfq_email: "Email Liên Hệ Chính *",
                rfq_phone: "Số Điện Thoại / WhatsApp / WeChat *",
                rfq_incoterm: "Điều Kiện Giao Hàng (Incoterms)",
                rfq_prod_select: "Sản Phẩm Quan Tâm",
                rfq_qty: "Sản Lượng Đơn Hàng Dự Kiến",
                rfq_details: "Yêu Cầu Chi Tiết (Yêu cầu Private Label, Chứng nhận đặc thù...)",
                btn_submit_rfq: "Gửi Yêu Cầu Báo Giá Chính Thức",
                foot_desc: "Đơn vị kết nối thương mại & xuất khẩu B2B thuộc SilViet Group. Chuyên dòng thực phẩm khô, nước dừa đóng lon & giày dép xuất khẩu sang EU, US, Middle East.",
                foot_products: "Dòng Sản Phẩm",
                foot_links: "Liên Kết",
                foot_contact: "Trụ Sở Sourcing"
            },
            en: {
                top_network: "SilViet Sourcing Hub: Ho Chi Minh • Binh Duong • Dong Nai • Hanoi",
                nav_products: "Core Products",
                nav_calc: "CBM & Container Calc",
                nav_services: "OEM/ODM Services",
                nav_rfq: "Inquire RFQ",
                btn_rfq: "Request a Quote (RFQ)",
                hero_badge: "B2B Sourcing & Export Connector - Vietnam to Worldwide",
                hero_title_1: "B2B Export Connector For",
                hero_title_2: "Vietnamese Dried Foods, Beverages & Footwear",
                hero_sub: "SilViet connects global buyers directly with ISO/HACCP/FDA-certified factories in Vietnam: Dried Rice Noodles/Pho, Canned Coconut Water, and OEM/ODM Footwear.",
                stat_factories: "Partner Factories",
                stat_containers: "Containers / Year",
                stat_qc: "QC Standard Inspection",
                finder_title: "Quick Sourcing Finder",
                finder_sub: "Search specs & get instant product quotations",
                label_category: "Category to Source",
                label_market: "Destination Market",
                label_order_type: "Order Type",
                label_vol: "Target Volume (Cartons / Pairs / Cont)",
                btn_find_now: "Find Factory & Get RFQ",
                cat_tag: "Key Export Portfolio",
                cat_title: "B2B Sourcing Core Categories",
                cat_desc: "All products are standardized with multi-language packaging and full international certificate dossiers.",
                tab_noodles: "1. Dried Foods & Rice Noodles",
                tab_beverages: "2. Coconut Water & Beverages",
                tab_footwear: "3. Footwear & Shoes",
                p1_n_title: "Export Dried Rice Noodles (Hu Tieu)",
                p1_n_desc: "Naturally chewy rice flour noodles, borax-free, bleach-free preservatives.",
                p2_n_title: "Export Dried Pho Noodles",
                p2_n_desc: "Low-temperature dried flat rice noodles, retaining rich authentic aroma when cooked.",
                p3_n_title: "Dried Bun Bo & Fresh Vermicelli",
                p3_n_desc: "Thick/thin rice vermicelli matching authentic Hue style, fast hydration and tender texture.",
                p1_b_title: "100% Pure Canned Coconut Water",
                p1_b_desc: "Naturally sweet Ben Tre coconut water, no added sugar, UHT sterilized.",
                p2_b_title: "Flavored Coconut Water & Pulp",
                p2_b_desc: "Infused coconut water with Mango, Passion Fruit, Pineapple or added coconut pulp flakes.",
                p3_b_title: "Canned Tropical Fruit Juices",
                p3_b_desc: "Pure concentrated tropical fruit juices (Soursop, Passion Fruit) rich in natural vitamins.",
                p1_f_title: "Export Sports Shoes & Sneakers",
                p1_f_desc: "Ergonomic designs, EVA/Rubber high-grip soles, breathable Flyknit uppers built for export.",
                p2_f_title: "Sandals & Casual Footwear",
                p2_f_desc: "Outdoor and fashion sandals with waterproof D-ring nylon straps, ultra-lightweight.",
                p3_f_title: "OEM Leather Shoes & Loafers",
                p3_f_desc: "Genuine leather & premium Microfiber dress shoes crafted on European shoe lasts.",
                btn_req_spec: "Request Specs & Quote",
                calc_tag: "B2B Estimation Tool",
                calc_title: "Volume (CBM) & Container Load Calculator",
                calc_sub: "Calculate exact 20ft / 40HC container requirements for your sourcing orders.",
                c1_head: "1. Select Item & Order Quantity",
                c1_select_prod: "Sourcing Commodity:",
                c1_carton_qty: "Total Cartons (or Total Shoe Pairs):",
                c2_head: "2. Estimated Sourcing Results",
                res_cbm: "Total Volume (CBM):",
                res_gw: "Gross Weight (GW Kg):",
                res_cont: "Recommended Container:",
                res_leadtime: "Estimated Lead Time:",
                btn_calc_rfq: "Submit RFQ With These Quantities",
                serv_sub: "Value-Added Services",
                serv_title: "Services Tailored For B2B Buyers",
                s1_title: "OEM & Private Labeling",
                s1_desc: "Custom package printing for rice noodles, canned beverages, and logo embossing on footwear according to exact brand guidelines.",
                s2_title: "QC Inspection & Export Packaging",
                s2_desc: "QC engineers monitor assembly lines, test moisture levels, outsole adhesion, and carton drop durability.",
                s3_title: "Customs Clearance, C/O & Freight",
                s3_desc: "Managing Phytosanitary certificates, FDA registrations, preferential C/O, and FOB/CIF/DDP vessel bookings.",
                rfq_tag: "Official RFQ Submission",
                rfq_title: "Submit Sourcing & Export Request",
                rfq_sub: "Fill out the form below to receive detailed spec sheets and quotations from SilViet Sourcing.",
                rfq_company: "Buyer Company Name *",
                rfq_email: "Primary Contact Email *",
                rfq_phone: "Phone / WhatsApp / WeChat *",
                rfq_incoterm: "Incoterms Delivery Term",
                rfq_prod_select: "Target Product",
                rfq_qty: "Estimated Order Volume",
                rfq_details: "Detailed Requirements (Private Label, Certificates...)",
                btn_submit_rfq: "Submit Official RFQ",
                foot_desc: "B2B Trade & Export Connector under SilViet Group. Specialized in dried foods, canned coconut water & footwear export to EU, US, and Middle East.",
                foot_products: "Product Lines",
                foot_links: "Quick Links",
                foot_contact: "Sourcing HQ"
            }
        };

        let currentLang = 'vi';

        window.onload = function() {
            lucide.createIcons();
            runCbmCalculator();
        };

        // Language Switcher Function
        function toggleLanguage() {
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            document.getElementById('langLabel').innerText = currentLang.toUpperCase();

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18nData[currentLang][key]) {
                    el.innerText = i18nData[currentLang][key];
                }
            });

            runCbmCalculator();
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        }

       // ================= HÀM CHUYỂN TAB DANH MỤC SẢN PHẨM =================
// ================= HÀM CHUYỂN TAB DANH MỤC CHUẨN XÁC =================
function switchCategoryTab(targetTab) {
    // 1. Ẩn tất cả các khung danh mục
    const allContents = document.querySelectorAll('.cat-content');
    allContents.forEach(content => {
        content.classList.add('hidden');
    });

    // 2. Reset tất cả các nút Tab về style xám
    const allButtons = document.querySelectorAll('.cat-tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-lg');
        btn.classList.add('bg-slate-800', 'text-slate-300', 'font-medium');
    });

    // 3. Hiện đúng khung chứa sản phẩm được chọn
    const activeContent = document.getElementById(`catContent-${targetTab}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }

    // 4. Highlight đúng nút Tab được bấm sang màu vàng Amber
    const activeBtn = document.getElementById(`tabBtn-${targetTab}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-300', 'font-medium');
        activeBtn.classList.add('bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-lg');
    }
}

// ================= HÀM XỬ LÝ NÚT XEM THÊM SẢN PHẨM =================
function loadMoreProducts() {
    // Tùng có thể điều hướng sang trang catalogue chi tiết hoặc mở rộng thêm danh sách
    alert("Đang tải thêm danh sách catalogue sản phẩm B2B mở rộng...");
    // Hoặc nếu muốn cuộn tới section RFQ/Liên hệ báo giá:
    // document.getElementById('rfq').scrollIntoView({ behavior: 'smooth' });
}

        // Interactive CBM & Container Calculator Logic
       function runCbmCalculator() {
    const selectEl = document.getElementById('calcProductType');
    const cartonInput = document.getElementById('calcCartonInput');
    
    // Lấy số lượng thùng, nếu không có mặc định là 1000
    const qty = cartonInput ? parseFloat(cartonInput.value) || 0 : 1000;

    // Lấy thông tin sản phẩm đang chọn từ Supabase (nếu có)
    let unitCbm = 0.038; 
    let unitGw = 7.5; 

    if (selectEl && globalProductsForCalc && globalProductsForCalc[selectEl.value]) {
        const prod = globalProductsForCalc[selectEl.value];
        unitCbm = parseFloat(prod.cbm_per_unit || 0.038);
        unitGw = parseFloat(prod.gw_per_unit || 7.5);
    }

    const totalCbm = (qty * unitCbm).toFixed(1);
    const totalGw = Math.round(qty * unitGw).toLocaleString('en-US');

    // Gợi ý Container
    let contRec = "Gom hàng lẻ LCL";
    if (totalCbm > 65) {
        const cont40Count = Math.ceil(totalCbm / 65);
        contRec = `${cont40Count} x 40ft HC`;
    } else if (totalCbm >= 25) {
        contRec = "1 x 40ft HC";
    } else if (totalCbm >= 15) {
        contRec = "1 x 20ft FCL";
    }

    // Đẩy kết quả lên giao diện (Có kiểm tra phần tử tồn tại để tránh lỗi null)
    const cbmEl = document.getElementById('resTotalCbm');
    const gwEl = document.getElementById('resTotalGw');
    const contEl = document.getElementById('resContRecommendation');
    const leadEl = document.getElementById('resLeadTime');

    if (cbmEl) cbmEl.innerText = `${totalCbm} CBM`;
    if (gwEl) gwEl.innerText = `${totalGw} Kg`;
    if (contEl) contEl.innerText = contRec;
    if (leadEl) leadEl.innerText = (totalCbm > 50) ? "20 - 25 Ngày" : "15 - 20 Ngày";
}

        // Hero Quick Finder submit handler
        function handleHeroFinder(event) {
            event.preventDefault();
            const category = document.getElementById('finderCategory').value;
            const volume = document.getElementById('finderVolume').value;
            
            // Auto switch category tab and fill RFQ
            if (category === 'noodles') switchCategoryTab('noodles');
            else if (category === 'beverages') switchCategoryTab('beverages');
            else if (category === 'footwear') switchCategoryTab('footwear');

            document.getElementById('rfqQty').value = volume;
            scrollToRFQ();
        }

        // Auto Populate RFQ Product
        function requestQuoteFor(productName) {
            const select = document.getElementById('rfqProdSelect');
            for(let i = 0; i < select.options.length; i++) {
                if(select.options[i].text.includes(productName) || select.options[i].value.includes(productName)) {
                    select.selectedIndex = i;
                    break;
                }
            }
            scrollToRFQ();
        }

        function scrollToRFQ() {
            document.getElementById('rfq').scrollIntoView({ behavior: 'smooth' });
        }

        // Main RFQ Form Submission
        async function handleMainRFQSubmit(event) {
    event.preventDefault();

    const formData = {
        company_name: document.getElementById('rfqComp')?.value || '',
        email: document.getElementById('rfqMail')?.value || '',
        phone: document.getElementById('rfqTel')?.value || '',
        incoterm: document.getElementById('rfqIncoterm')?.value || 'FOB',
        product_category: document.getElementById('rfqProdSelect')?.value || '',
        quantity: document.getElementById('rfqQty')?.value || '',
        shipping_method: document.getElementById('rfqShippingMethod')?.value || 'FCL - Container 40ft HC', // <-- Thêm dòng này để lưu vào Supabase
        notes: document.getElementById('rfqDetails')?.value || '',
        full_name: document.getElementById('rfqComp')?.value || 'N/A'
    };

    const alertBox = document.getElementById('rfqAlertBox');

    const { error } = await window.supabase
        .from('rfq_requests')
        .insert([formData]);

    if (error) {
        console.error('Lỗi Supabase:', error.message);
        if (alertBox) {
            alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 block';
            alertBox.innerText = 'Gửi thất bại: ' + error.message;
        }
    } else {
        if (alertBox) {
            alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 block';
            alertBox.innerText = 'Gửi yêu cầu báo giá thành công! Dữ liệu đã lưu vào Supabase.';
        }
        document.getElementById('rfqMainForm')?.reset();
    }
}
    

   

    // Khởi tạo Lucide Icons
    lucide.createIcons();

    // Chuyển tab danh mục sản phẩm
    function switchCategoryTab(tabName) {
        document.querySelectorAll('.cat-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.cat-tab-btn').forEach(btn => {
            btn.classList.remove('border-brand-emerald', 'text-brand-emeraldLight', 'border-brand-blue', 'text-brand-blueLight');
            btn.classList.add('border-transparent', 'text-slate-400');
        });
        
        const targetTab = document.getElementById('catContent-' + tabName);
        if (targetTab) targetTab.classList.remove('hidden');

        const activeBtn = document.getElementById('catTab-' + tabName);
        if (activeBtn) {
            activeBtn.classList.remove('border-transparent', 'text-slate-400');
            activeBtn.classList.add('border-brand-emerald', 'text-brand-emeraldLight');
        }
    }

    // Hàm cuộn trang đến phần RFQ an toàn không bị lỗi null
 // Hàm cuộn trang đến đúng section id="rfq-form" của Tùng
function scrollToRFQ() {
    // Tìm chính xác ID "rfq-form" theo đúng HTML của Tùng
    const rfqSection = document.getElementById('rfq-form'); 
    if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Dự phòng nếu không tìm thấy thì cuộn theo form chính
        const formEl = document.getElementById('rfqMainForm');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

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

    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.toggle('hidden');
    }

    // Fetch dữ liệu sản phẩm từ Supabase (Hỗ trợ linh hoạt nhiều kiểu tên cột)
    async function fetchProductsFromDatabase() {
        try {
            const { data: products, error } = await window.dbClient
                .from('products')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            const noodlesContainer = document.getElementById('catContent-noodles');
            const beveragesContainer = document.getElementById('catContent-beverages');
            const footwearContainer = document.getElementById('catContent-footwear');

            if (noodlesContainer) noodlesContainer.innerHTML = '';
            if (beveragesContainer) beveragesContainer.innerHTML = '';
            if (footwearContainer) footwearContainer.innerHTML = '';

            if (!products || products.length === 0) {
                console.warn('Không tìm thấy sản phẩm nào trong bảng products.');
                return;
            }

          products.forEach(item => {
    const containerId = 'catContent-' + (item.category || 'noodles');
    const container = document.getElementById(containerId);

    if (container) {
        // Map đúng chính xác các cột từ Supabase của Tùng
        const name = item.name_vi || item.name_en || item.name || 'Sản phẩm xuất khẩu';
        const desc = item.specs || item.description || 'Sản phẩm đạt chuẩn xuất khẩu.';
        
        // 👉 ĐÃ SỬA: Đọc đúng cột packaging (Lon 500ml, Thùng 5kg...)
        const packing = item.packaging || item.specs_packing || 'Đang cập nhật';
        
        const detail = item.specs_detail || 'Chuẩn xuất khẩu';
        const cert = item.specs_cert || 'FDA / ISO / HACCP';
        const img = item.image_url || 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80';

        const cardHTML = `
            <div class="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-brand-emerald/50 transition">
                <div class="h-48 bg-slate-800 relative overflow-hidden group">
                    <img src="${img}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/0f172a/ffffff?text=SilViet+Product'">
                    <span class="absolute top-3 right-3 bg-brand-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Sourcing</span>
                </div>
                <div class="p-5">
                    <h4 class="font-bold text-base text-white mb-1">${name}</h4>
                    <p class="text-xs text-slate-400 mb-4">${desc}</p>
                    <div class="space-y-1.5 text-xs text-slate-300 border-t border-slate-700/80 pt-3 mb-4">
                        <div class="flex justify-between"><span>Quy cách:</span> <span class="font-bold text-white">${packing}</span></div>
                        <div class="flex justify-between"><span>Thông số:</span> <span class="font-bold text-white">${detail}</span></div>
                        <div class="flex justify-between"><span>Chứng nhận:</span> <span class="font-bold text-brand-emeraldLight">${cert}</span></div>
                    </div>
                    <button onclick="requestQuoteFor('${name.replace(/'/g, "\\'")}')" class="w-full bg-slate-700 hover:bg-brand-emerald text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1">
                        <span>Yêu Cầu Specs & Báo Giá</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    }
});
            lucide.createIcons();
        } catch (err) {
            console.error('Lỗi khi tải sản phẩm từ Supabase:', err.message);
        }
    }

    // Xử lý gửi Form chính lên Supabase
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

    // Tự động suy ra nhà máy nếu trống
    if (!supplier && productCategory) {
        const matchedProd = (typeof globalProductsForCalc !== 'undefined' ? globalProductsForCalc : []).find(p => 
            (p.name_vi || p.name || p.name_en || '').trim() === productCategory
        );
        if (matchedProd && matchedProd.company_id) {
            const matchedComp = (typeof globalCompaniesList !== 'undefined' ? globalCompaniesList : []).find(c => c.id === matchedProd.company_id);
            if (matchedComp) supplier = matchedComp.name;
        }
        if (!supplier && typeof globalCompaniesList !== 'undefined' && globalCompaniesList.length > 0) {
            supplier = globalCompaniesList[0].name;
        }
    }

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

    // Kiểm tra và lấy đúng Supabase client (hỗ trợ cả dbClient lẫn supabase)
    const supabaseClient = window.dbClient || window.supabase;
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
        console.error('Supabase client chưa được khởi tạo!');
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg transition-all";
            alertBox.innerHTML = `
                <i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 shrink-0"></i>
                <div>
                    <strong class="font-bold block text-rose-200">Lỗi Kết Nối!</strong>
                    Không tìm thấy client Supabase. Vui lòng kiểm tra lại cấu hình script khởi tạo.
                </div>
            `;
            alertBox.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('rfq_requests')
            .insert([rfqPayload]);

        if (error) throw error;

        // --- HIỂN THỊ THÔNG BÁO THÀNH CÔNG ĐẸP MẮT ---
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-3 shadow-lg transition-all";
            alertBox.innerHTML = `
                <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0"></i>
                <div>
                    <strong class="font-bold block text-emerald-200">Gửi Yêu Cầu Báo Giá (RFQ) Thành Công!</strong>
                    SilViet Sourcing đã tiếp nhận thông tin và sẽ gửi bảng Specs & báo giá chi tiết qua email cho bạn trong thời gian sớm nhất.
                </div>
            `;
            alertBox.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Reset form sau khi gửi thành công
        const mainForm = document.getElementById('rfqMainForm');
        if (mainForm) mainForm.reset();

        // Cuộn mượt lên chỗ thông báo nếu cần
        if (alertBox) alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
        console.error('Lỗi khi gửi RFQ:', err.message);
        
        // --- HIỂN THỊ THÔNG BÁO LỖI ---
        if (alertBox) {
            alertBox.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-3 shadow-lg transition-all";
            alertBox.innerHTML = `
                <i data-lucide="alert-circle" class="w-5 h-5 text-rose-400 shrink-0"></i>
                <div>
                    <strong class="font-bold block text-rose-200">Gửi RFQ Thất Bại!</strong>
                    Chi tiết lỗi: ${err.message}
                </div>
            `;
            alertBox.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }
}
    function handleHeroFinder(event) {
        event.preventDefault();
        const volume = document.getElementById('finderVolume')?.value;
        const rfqQtyEl = document.getElementById('rfqQty');
        if (rfqQtyEl && volume) rfqQtyEl.value = volume;
        scrollToRFQ();
    }

    // Tự động chạy hàm load sản phẩm khi trang tải xong
    document.addEventListener('DOMContentLoaded', () => {
        fetchProductsFromDatabase();
    });


// 1. Hàm tải sản phẩm và nạp vào cả 2 thẻ select
async function loadProductsIntoCalculator() {
    try {
        const { data: products, error } = await window.dbClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;

        globalProductsForCalc = products || [];

        const calcSelectEl = document.getElementById('calcProductType');
        const rfqSelectEl = document.getElementById('rfqProdSelect');

        if (calcSelectEl) calcSelectEl.innerHTML = '';
        if (rfqSelectEl) rfqSelectEl.innerHTML = '<option value="">-- Chọn sản phẩm quan tâm --</option>';

        if (globalProductsForCalc.length === 0) {
            if (calcSelectEl) calcSelectEl.innerHTML = '<option value="">Không có sản phẩm nào</option>';
            return;
        }

        globalProductsForCalc.forEach((item, index) => {
            const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm xuất khẩu').trim();
            const packingInfo = item.packaging ? ` (${item.packaging})` : '';
            const fullLabel = `${productName}${packingInfo}`;

            // 1. Đổ vào select của bảng tính CBM (value là index)
            if (calcSelectEl) {
                const opt1 = document.createElement('option');
                opt1.value = index;
                opt1.text = fullLabel;
                if (index === 0) opt1.selected = true;
                calcSelectEl.appendChild(opt1);
            }

            // 2. Đổ vào select của form RFQ bên dưới (value là fullLabel để khớp hoàn toàn)
            if (rfqSelectEl) {
                const opt2 = document.createElement('option');
                opt2.value = fullLabel; 
                opt2.text = fullLabel;
                rfqSelectEl.appendChild(opt2);
            }
        });

        runCbmCalculator();
    } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err.message);
    }
}
// 2. Hàm tính toán CBM (bọc kiểm tra null cho toàn bộ các ô kết quả)
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

// 3. Hàm chuyển dữ liệu tính toán xuống Form RFQ
// Hàm đồng bộ dữ liệu từ bảng tính CBM xuống Form RFQ chính thức
function sendCalcToRFQ() {
    const cartonInput = document.getElementById('calcCartonInput');
    const qty = cartonInput ? cartonInput.value : '1000';
    const cbmText = document.getElementById('resTotalCbm')?.innerText || '';
    const contText = document.getElementById('resContRecommendation')?.innerText || '';
    
    // 1. Lấy đúng tên sản phẩm đang chọn ở bảng tính CBM
    const calcProductSelect = document.getElementById('calcProductType');
    let selectedProductName = '';
    
    if (calcProductSelect && globalProductsForCalc && globalProductsForCalc.length > 0) {
        const selectedIndex = calcProductSelect.value;
        const prod = globalProductsForCalc[selectedIndex];
        if (prod) {
            selectedProductName = (prod.name_vi || prod.name || prod.name_en || '').trim();
        }
    }

    // 2. Đồng bộ CHÍNH XÁC tuyệt đối tên sản phẩm xuống form RFQ
    const rfqProdSelect = document.getElementById('rfqProdSelect');
    if (rfqProdSelect && selectedProductName) {
        let matched = false;
        for (let i = 0; i < rfqProdSelect.options.length; i++) {
            const optText = rfqProdSelect.options[i].text.trim();
            const optVal = rfqProdSelect.options[i].value.trim();
            
            if (optText.toLowerCase() === selectedProductName.toLowerCase() || 
                optVal.toLowerCase() === selectedProductName.toLowerCase() ||
                optText.toLowerCase().includes(selectedProductName.toLowerCase())) {
                rfqProdSelect.selectedIndex = i;
                matched = true;
                break;
            }
        }
        if (!matched) {
            rfqProdSelect.value = selectedProductName;
        }
    }

    // 3. ĐỒNG BỘ CHUẨN XÁC PHƯƠNG THỨC VẬN CHUYỂN XUỐNG DƯỚI
    const calcShippingEl = document.getElementById('calcShippingMethod');
    const rfqShippingEl = document.getElementById('rfqShippingMethod');
    
    if (calcShippingEl && rfqShippingEl) {
        const selectedShippingText = calcShippingEl.options[calcShippingEl.selectedIndex].text.trim();
        let shippingMatched = false;

        // Quét qua các option của form RFQ để tìm option có text khớp hoặc chứa từ khóa
        for (let i = 0; i < rfqShippingEl.options.length; i++) {
            const optText = rfqShippingEl.options[i].text.trim();
            const optVal = rfqShippingEl.options[i].value.trim();

            if (optText.toLowerCase().includes(calcShippingEl.value.toLowerCase()) || 
                optVal.toLowerCase().includes(calcShippingEl.value.toLowerCase()) ||
                selectedShippingText.toLowerCase().includes(optText.toLowerCase())) {
                rfqShippingEl.selectedIndex = i;
                shippingMatched = true;
                break;
            }
        }

        // Nếu không khớp option nào thì gán thẳng value bằng giá trị trên bảng tính
        if (!shippingMatched) {
            rfqShippingEl.value = calcShippingEl.value;
        }
    }

    // 4. Điền số lượng và thông tin chi tiết vào form RFQ
    const qtyInput = document.getElementById('rfqQty');
    if (qtyInput) {
        qtyInput.value = `${qty} Thùng (~${cbmText}, Khuyên dùng: ${contText})`;
    }

    const detailsInput = document.getElementById('rfqDetails');
    if (detailsInput) {
        detailsInput.value = `Yêu cầu tự động từ công cụ tính CBM. Sản phẩm: ${selectedProductName}. Số lượng: ${qty} thùng. Thể tích: ${cbmText}. Gợi ý cont: ${contText}.`;
    }

    // 5. Kích hoạt cuộn mượt xuống đúng section id="rfq-form"
    const rfqSection = document.getElementById('rfq-form');
    if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        const formEl = document.getElementById('rfqMainForm');
        if (formEl) {
            formEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
}


// 1. Tải danh sách nhà máy và sản phẩm khi load trang
async function loadAllSystemData() {
    try {
        // Tải song song cả 2 bảng products và companies từ Supabase
        const [prodRes, compRes] = await Promise.all([
            window.dbClient.from('products').select('*').order('created_at', { ascending: true }),
            window.dbClient.from('companies').select('*').order('name', { ascending: true })
        ]);

        // Gán dữ liệu sản phẩm
        if (!prodRes.error && prodRes.data && prodRes.data.length > 0) {
            globalProductsForCalc = prodRes.data;
        } else {
            console.warn('Không tải được bảng products hoặc bảng rỗng, kiểm tra RLS.');
        }

        // Gán dữ liệu nhà máy/công ty (Dùng dữ liệu dự phòng nếu bảng rỗng hoặc lỗi RLS)
        if (!compRes.error && compRes.data && compRes.data.length > 0) {
            globalCompaniesList = compRes.data;
        } else {
            console.warn('Bảng companies rỗng hoặc bị chặn RLS, chuyển sang dùng dữ liệu dự phòng.');
            globalCompaniesList = fallbackCompanies;
        }

        // 1. --- Đổ dữ liệu vào CBM Calculator ---
        const calcSelectEl = document.getElementById('calcProductType');
        if (calcSelectEl && globalProductsForCalc.length > 0) {
            calcSelectEl.innerHTML = '';
            globalProductsForCalc.forEach((item, index) => {
                const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm').trim();
                const packingInfo = item.packaging ? ` (${item.packaging})` : '';
                const opt = document.createElement('option');
                opt.value = index;
                opt.text = `${productName}${packingInfo}`;
                calcSelectEl.appendChild(opt);
            });
            if (typeof runCbmCalculator === 'function') {
                runCbmCalculator();
            }
        }

        // 2. --- Đổ dữ liệu vào Quick Sourcing Finder (Hero section) ---
        const finderProdSelect = document.getElementById('finderProductSelect');
        if (finderProdSelect && globalProductsForCalc.length > 0) {
            finderProdSelect.innerHTML = '<option value=""> Chọn Sản Phẩm OEM / Sourcing </option>';
            globalProductsForCalc.forEach((item, index) => {
                const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm').trim();
                const opt = document.createElement('option');
                opt.value = index;
                opt.text = productName;
                finderProdSelect.appendChild(opt);
            });
        }

        // 3. --- Đổ dữ liệu Sản Phẩm vào Form RFQ ---
        const rfqSelectEl = document.getElementById('rfqProdSelect');
        if (rfqSelectEl && globalProductsForCalc.length > 0) {
            rfqSelectEl.innerHTML = '<option value="">-- Chọn sản phẩm quan tâm --</option>';
            globalProductsForCalc.forEach((item) => {
                const productName = (item.name_vi || item.name || item.name_en || 'Sản phẩm').trim();
                const opt = document.createElement('option');
                opt.value = productName;
                opt.text = productName;
                rfqSelectEl.appendChild(opt);
            });
        }

        // 4. --- Đổ dữ liệu Nhà Máy (Verified Suppliers) vào Form RFQ ---
        const rfqSupplierEl = document.getElementById('rfqSupplier');
        if (rfqSupplierEl) {
            rfqSupplierEl.innerHTML = '<option value="">-- Chọn nhà máy đối tác --</option>';
            globalCompaniesList.forEach((comp) => {
                const opt = document.createElement('option');
                opt.value = comp.name;
                opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
                rfqSupplierEl.appendChild(opt);
            });
        }

    } catch (err) {
        console.error('Lỗi khi tải dữ liệu hệ thống:', err.message);
        globalCompaniesList = fallbackCompanies;
    }
}

// 2. Khi chọn Sản phẩm trên Quick Finder -> Lọc ra Nhà máy tương ứng
// Hàm ghép nối nhà máy thông minh (Auto-matching theo tên/loại sản phẩm)
function handleQuickProductChange() {
    const prodSelect = document.getElementById('finderProductSelect');
    const supplierSelect = document.getElementById('quickSupplierSelect');
    
    if (!prodSelect || !supplierSelect) return;

    const selectedIndex = prodSelect.value;
    
    if (selectedIndex === "") {
        supplierSelect.innerHTML = '<option value="">-- Vui lòng chọn sản phẩm trước --</option>';
        handleQuickSupplierChange();
        return;
    }

    const selectedProduct = globalProductsForCalc[selectedIndex];
    const productName = (selectedProduct?.name_vi || selectedProduct?.name || '').toLowerCase();

    // 1. Ưu tiên lọc theo company_id từ Supabase nếu có
    if (selectedProduct && selectedProduct.company_id) {
        currentFilteredCompanies = globalCompaniesList.filter(c => c.id === selectedProduct.company_id);
    } else {
        currentFilteredCompanies = [];
    }

    // 2. Nếu chưa có company_id, tự động ghép nối thông minh theo từ khóa sản phẩm
    if (currentFilteredCompanies.length === 0 && globalCompaniesList.length > 0) {
        if (productName.includes('bún') || productName.includes('phở') || productName.includes('hủ tiếu') || productName.includes('nông sản')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('an giang') || c.name.toLowerCase().includes('food'));
        } else if (productName.includes('dừa') || productName.includes('nước') || productName.includes('đồ uống')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('bến tre') || c.name.toLowerCase().includes('coconut'));
        } else if (productName.includes('giày') || productName.includes('dép') || productName.includes('footwear')) {
            currentFilteredCompanies = globalCompaniesList.filter(c => c.name.toLowerCase().includes('saigon') || c.name.toLowerCase().includes('footwear'));
        }

        // Nếu vẫn không khớp từ khóa nào, hiển thị toàn bộ danh sách nhà máy đối tác
        if (currentFilteredCompanies.length === 0) {
            currentFilteredCompanies = globalCompaniesList;
        }
    }

    // 3. Render danh sách nhà máy lên ô Select
    supplierSelect.innerHTML = '';

    currentFilteredCompanies.forEach((comp, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
        supplierSelect.appendChild(opt);
    });

    // Mặc định chọn nhà máy đầu tiên và hiển thị chứng chỉ
    if (currentFilteredCompanies.length > 0) {
        supplierSelect.selectedIndex = 0;
        handleQuickSupplierChange();
    }
}

// 3. Khi chọn Nhà máy -> Hiển thị Chứng chỉ & Thị trường đích
function handleQuickSupplierChange() {
    const supplierSelect = document.getElementById('quickSupplierSelect');
    const certsDisplayEl = document.getElementById('quickCertsDisplay');
    const marketSelect = document.getElementById('quickTargetMarket');

    if (!supplierSelect || supplierSelect.value === "" || currentFilteredCompanies.length === 0) {
        if (certsDisplayEl) certsDisplayEl.innerHTML = '<span class="text-[10px] text-slate-400">Chọn nhà máy để xem chứng chỉ...</span>';
        if (marketSelect) marketSelect.innerHTML = '<option value="">-- Chọn nhà máy để xem thị trường --</option>';
        return;
    }

    const selectedIdx = parseInt(supplierSelect.value);
    const selectedComp = currentFilteredCompanies[selectedIdx];

    if (!selectedComp) return;

    // Render huy hiệu chứng chỉ (Certs badges)
    if (certsDisplayEl) {
        const certs = selectedComp.certs || [];
        certsDisplayEl.innerHTML = certs.length > 0 
            ? certs.map(c => `<span class="px-2 py-0.5 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-[10px] font-bold rounded-md">✓ ${c}</span>`).join(' ')
            : '<span class="text-[10px] text-slate-400">Đã kiểm định tiêu chuẩn xuất khẩu</span>';
    }

    // Render thị trường đích của nhà máy
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
// Hàm nạp danh sách nhà máy vào form RFQ khi trang vừa tải
function initRfqSuppliersDropdown() {
    const rfqSupplierEl = document.getElementById('rfqSupplier');
    if (!rfqSupplierEl) return;

    rfqSupplierEl.innerHTML = '<option value="">-- Chọn nhà máy đối tác --</option>';
    if (globalCompaniesList && globalCompaniesList.length > 0) {
        globalCompaniesList.forEach((comp) => {
            const opt = document.createElement('option');
            opt.value = comp.name;
            opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
            rfqSupplierEl.appendChild(opt);
        });
    }
}

// Xử lý khi bấm nút "Kết Nối Nhà Máy & Nhận RFQ" ở Quick Sourcing Finder
// 1. Tải dữ liệu động vào danh sách nhà máy trên Form RFQ
function populateRfqSuppliers(companies = globalCompaniesList) {
    const rfqSupplierEl = document.getElementById('rfqSupplier');
    if (!rfqSupplierEl) return;

    rfqSupplierEl.innerHTML = '<option value="">-- Chọn nhà máy đối tác --</option>';
    if (companies && companies.length > 0) {
        companies.forEach((comp) => {
            const opt = document.createElement('option');
            opt.value = comp.name;
            opt.text = `🏢 ${comp.name} (${comp.location || 'Việt Nam'})`;
            rfqSupplierEl.appendChild(opt);
        });
    }
}

// 2. Thay đổi nhà máy tương ứng khi chọn Sản phẩm trực tiếp trên Form RFQ
function handleRFQProductChange() {
    const rfqProdSelect = document.getElementById('rfqProdSelect');
    const rfqSupplierEl = document.getElementById('rfqSupplier');
    if (!rfqProdSelect || !rfqSupplierEl) return;

    const selectedName = rfqProdSelect.value;
    if (!selectedName) return;

    const foundProd = globalProductsForCalc.find(p => 
        (p.name_vi || p.name || p.name_en || '').trim() === selectedName
    );

    if (foundProd && foundProd.company_id) {
        const matchedComp = globalCompaniesList.find(c => c.id === foundProd.company_id);
        if (matchedComp) {
            rfqSupplierEl.value = matchedComp.name;
            return;
        }
    }
    
    // Nếu không khớp ID, tự động chọn công ty đầu tiên
    if (globalCompaniesList.length > 0) {
        rfqSupplierEl.value = globalCompaniesList[0].name;
    }
}

// 3. Hàm kích hoạt khi bấm nút "Kết Nối Nhà Máy & Nhận RFQ" từ Quick Sourcing Finder
function handleHeroFinder(e) {
    e.preventDefault();

    // Lấy thông tin từ Quick Finder
    const finderProdSelect = document.getElementById('finderProductSelect');
    const quickSupplierSelect = document.getElementById('quickSupplierSelect');
    const quickMarketSelect = document.getElementById('quickTargetMarket');

    // a. Đồng bộ Sản Phẩm
    const rfqProdSelect = document.getElementById('rfqProdSelect');
    let selectedProdName = '';
    if (finderProdSelect && finderProdSelect.value !== "" && rfqProdSelect) {
        const prod = globalProductsForCalc[finderProdSelect.value];
        if (prod) {
            selectedProdName = (prod.name_vi || prod.name || prod.name_en || '').trim();
            rfqProdSelect.value = selectedProdName;
        }
    }

    // b. Đồng bộ Nhà Máy
    const rfqSupplier = document.getElementById('rfqSupplier');
    let selectedSupplierName = '';
    if (quickSupplierSelect && quickSupplierSelect.value !== "" && rfqSupplier) {
        const selectedIdx = parseInt(quickSupplierSelect.value);
        const comp = (currentFilteredCompanies && currentFilteredCompanies[selectedIdx]) || globalCompaniesList[selectedIdx];
        if (comp) {
            selectedSupplierName = comp.name;
            rfqSupplier.value = selectedSupplierName;
        }
    }

    // c. Đồng bộ Thị Trường Đích
    const rfqTargetMarket = document.getElementById('rfqTargetMarket');
    let selectedMarketName = '';
    if (quickMarketSelect && quickMarketSelect.value !== "" && rfqTargetMarket) {
        selectedMarketName = quickMarketSelect.value;
        // Kiểm tra xem value có tồn tại trong option không, nếu chưa thì thêm tạm
        let exists = Array.from(rfqTargetMarket.options).some(opt => opt.value === selectedMarketName);
        if (!exists) {
            const newOpt = document.createElement('option');
            newOpt.value = selectedMarketName;
            newOpt.text = selectedMarketName;
            rfqTargetMarket.appendChild(newOpt);
        }
        rfqTargetMarket.value = selectedMarketName;
    }

    // d. Điền mô tả chi tiết tự động
    const rfqDetails = document.getElementById('rfqDetails');
    if (rfqDetails) {
        rfqDetails.value = `Yêu cầu kết nối từ Quick Sourcing Finder. Sản phẩm: ${selectedProdName || 'Theo lựa chọn'}. Nhà máy sản xuất: ${selectedSupplierName || 'Đối tác SilViet'}. Thị trường xuất khẩu: ${selectedMarketName || 'Toàn cầu'}.`;
    }

    // e. Cuộn mượt xuống section RFQ
    const rfqSection = document.getElementById('rfq-form');
    if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
    }
}
// 4. Bổ sung gọi nạp dữ liệu nhà máy khi tải trang
// Kích hoạt nạp dữ liệu toàn bộ khi mở trang
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tải danh sách sản phẩm cho Calculator và Form RFQ
    loadDynamicCategories();
    loadProductsIntoCalculator();
    
    // 2. Tải danh sách nhà máy và khởi tạo Quick Finder theo đúng luồng mới
    loadAllSystemData(); 
    initRfqSuppliersDropdown
    
  if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,           // Thời gian chạy animation (800ms)
            once: true,              // Chỉ chạy 1 lần khi lướt tới
            easing: 'ease-out-cubic',// Kiểu chuyển động mượt
            
            // --- CẤU HÌNH CUỘN CHUỘT MỚI KÍCH HOẠT ---
            offset: 120,             // Phải lướt qua phần tử 120px thì animation mới bắt đầu chạy
            anchorPlacement: 'top-bottom' // Kích hoạt khi ĐỈNH của thẻ chạm ĐÁY của màn hình
        });
    }
});
// ================= XỬ LÝ INTRO & TỰ ĐỘNG CHẠY VIDEO KHI REFRESH =================
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("companyIntroVideo");

    if (video) {
        video.muted = true; // Bắt buộc để mute để trình duyệt cho phép autoplay
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
        video.muted = true; // Giữ trạng thái muted để video chạy tự động hoàn hảo trên mọi trình duyệt
        video.play().catch(error => {
            console.log("Trình duyệt chặn autoplay:", error);
        });
    }
}

function skipIntro() {
    finishIntro();
}
// ================= HÀM BẬT / TẮT ÂM THANH VIDEO =================
function toggleAudio() {
    const video = document.getElementById('bgCompanyVideo');
    const audioText = document.getElementById('audioText');
    const audioIcon = document.getElementById('audioIcon');
    
    // Đường dẫn SVG cho Loa Bật (sóng âm) và Loa Tắt (dấu X)
    const mutedIconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`;
    const unmutedIconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;

    if (video.muted) {
        video.muted = false;
        audioText.innerText = 'Tắt tiếng';
        audioIcon.innerHTML = unmutedIconPath; // Đổi sang hình loa phát sóng
    } else {
        video.muted = true;
        audioText.innerText = 'Bật tiếng';
        audioIcon.innerHTML = mutedIconPath; // Đổi lại hình loa có dấu X
    }
}// Giả sử Tùng đã khởi tạo client Supabase ở đầu file app.js
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ================= HÀM TẢI DANH MỤC & SẢN PHẨM TỪ SUPABASE =================
async function loadDynamicCategories() {
    console.log("-> HÀM loadDynamicCategories ĐÃ ĐƯỢC KÍCH HOẠT!");

    const tabsContainer = document.getElementById('categoryTabsContainer');
    const contentsContainer = document.getElementById('categoryContentsContainer');

    if (!tabsContainer || !contentsContainer) return;

    if (!window.dbClient) {
        console.error("window.dbClient chưa sẵn sàng!");
        return;
    }

    try {
        console.log("Đang gửi yêu cầu lấy categories từ Supabase...");
        
        // Thêm timeout giả lập hoặc log kiểm tra
        const responseCat = await window.dbClient
            .from('categories')
            .select('*');

        console.log("Kết quả trả về từ bảng categories:", responseCat);

        const { data: categories, error: catError } = responseCat;
        if (catError) throw catError;

        if (!categories || categories.length === 0) {
            tabsContainer.innerHTML = `<p class="text-slate-500 text-sm">Không có dữ liệu trong bảng categories.</p>`;
            return;
        }

        const { data: products, error: prodError } = await window.dbClient
            .from('products')
            .select('*');

        console.log("Kết quả trả về từ bảng products:", products);
        if (prodError) throw prodError;

        tabsContainer.innerHTML = '';
        contentsContainer.innerHTML = '';

        categories.forEach((cat, index) => {
            const isFirst = index === 0;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = `tabBtn-${cat.slug}`;
            btn.onclick = () => switchCategoryTab(cat.slug);
            btn.className = `cat-tab-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                isFirst 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg' 
                    : 'bg-slate-800 text-slate-300 hover:text-white font-medium'
            }`;
            btn.innerHTML = `<span>${cat.icon || '📦'}</span> ${cat.name}`;
            tabsContainer.appendChild(btn);

            const gridDiv = document.createElement('div');
            gridDiv.id = `catContent-${cat.slug}`;
            gridDiv.className = `cat-content grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isFirst ? '' : 'hidden'}`;

            const catProducts = products ? products.filter(p => p.category_id === cat.id || p.category_slug === cat.slug) : [];

            if (catProducts.length > 0) {
                gridDiv.innerHTML = catProducts.map(prod => renderProductCard(prod)).join('');
            } else {
                gridDiv.innerHTML = `
                    <div class="col-span-full py-12 text-center bg-slate-800/30 rounded-2xl border border-slate-800">
                        <p class="text-slate-400 text-sm italic">Chưa có sản phẩm nào thuộc danh mục ${cat.name}.</p>
                    </div>
                `;
            }

            contentsContainer.appendChild(gridDiv);
        });

    } catch (err) {
        console.error("LỖI CHI TIẾT TỪ SUPABASE:", err);
        tabsContainer.innerHTML = `<p class="text-red-400 text-sm">Lỗi kết nối CSDL: ${err.message || err}</p>`;
    }
}
// Hàm render thẻ card sản phẩm chuẩn B2B
function renderProductCard(prod) {
    const productName = prod.name_vi || prod.name || prod.name_en || prod.product_name || 'Sản phẩm chưa đặt tên';
    
    return `
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-amber-500/50 transition duration-300 flex flex-col justify-between">
            <div>
                <!-- Bấm vào ảnh để xem Chi Tiết -->
                <div onclick="openProductDetailModal('${prod.id}')" class="relative h-64 overflow-hidden bg-slate-950 flex items-center justify-center p-2 cursor-pointer group">
                    <img src="${prod.image_url || 'https://via.placeholder.com/400x300'}" 
                         alt="${productName}" 
                         class="w-full h-full object-contain group-hover:scale-105 transition duration-500">
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10">
                        ${prod.tag || 'SOURCING'}
                    </span>
                    <span class="absolute bottom-3 left-3 px-2 py-1 rounded bg-slate-900/80 text-slate-300 text-[10px] opacity-0 group-hover:opacity-100 transition duration-200">
                      🔍 Bấm để xem chi tiết
                    </span>
                </div>
                <div class="p-5 space-y-2">
                    <h3 onclick="openProductDetailModal('${prod.id}')" class="text-white font-bold text-base leading-snug cursor-pointer hover:text-amber-400 transition">${productName}</h3>
                    <p class="text-slate-400 text-xs line-clamp-2">${prod.description || ''}</p>
                </div>
            </div>
            <div class="p-5 pt-0">
                <button type="button" onclick="openRfqModal('${prod.id}')" class="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold text-xs transition duration-200 text-center block cursor-pointer">
                    Yêu Cầu Specs & Báo Giá →
                </button>
            </div>
        </div>
    `;
}

// Hàm Switch Tab chính xác
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

// Hàm nút Xem thêm
function loadMoreProducts() {
    alert("Đang mở rộng toàn bộ danh mục sản phẩm B2B...");
}
// Biến lưu danh sách sản phẩm tạm thời để tra cứu nhanh khi mở Popup
window.allProductsData = [];

// Hàm mở Modal Chi Tiết
function openProductDetailModal(productId) {
  const product = window.allProductsData.find(p => String(p.id) === String(productId));
  if (!product) return;

  const productName = product.name_vi || product.name || product.name_en || product.product_name || 'Sản phẩm chưa đặt tên';

  // Gán thông tin vào Modal
  document.getElementById('detailProductImage').src = product.image_url || 'https://via.placeholder.com/400x300';
  document.getElementById('detailProductImage').alt = productName;
  document.getElementById('detailProductName').innerText = productName;
  document.getElementById('detailProductDesc').innerText = product.description || 'Chưa có thông tin mô tả chi tiết.';
  document.getElementById('detailProductTag').innerText = product.tag || 'SOURCING';

  // Thông số kỹ thuật (Gán fallback nếu DB chưa có cột)
  document.getElementById('detailProductPackaging').innerText = product.packaging || 'Thùng carton xuất khẩu';
  document.getElementById('detailProductSpecs').innerText = product.specs || 'Chuẩn hóa quy cách B2B';
  document.getElementById('detailProductCerts').innerText = product.certifications || 'FDA, ISO 22000, Halal';

  // Khi bấm nút Báo Giá trên Popup Chi Tiết -> Đóng Popup này & Mở Form RFQ
  document.getElementById('detailRfqBtn').onclick = function() {
    closeProductDetailModal();
    if (typeof openRfqModal === 'function') {
      openRfqModal(product.id);
    }
  };

  // Hiển thị Modal
  document.getElementById('productDetailModal').classList.remove('hidden');
}

// Hàm đóng Modal
function closeProductDetailModal() {
  document.getElementById('productDetailModal').classList.add('hidden');
}