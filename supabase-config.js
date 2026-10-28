// Cấu hình kết nối Supabase
const SUPABASE_URL = 'https://dweuihnqfpinmklvyezq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YiRLWisNmwnlR150gjQnBQ_Oa4HEbYb';

if (window.supabase) {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.dbClient = client;
    window.supabase = client;
    console.log("Supabase client đã sẵn sàng!");
} else {
    console.error("Thư viện Supabase chưa được tải từ CDN!");
}