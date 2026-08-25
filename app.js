// استبدل المفاتيح الخاصة بك في Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('registrationForm');
const statusMsg = document.getElementById('statusMsg');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.innerText = 'جاري الإرسال...';
  statusMsg.style.display = 'none';

  const studentName = document.getElementById('studentName').value.trim();
  const grade = document.getElementById('studentGrade').value;
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // الإرسال إلى جدول student
  const { data, error } = await supabaseClient
    .from('student')
    .insert([
      { 
        name: studentName, 
        grade: grade, 
        address: address, 
        phone: phone 
      }
    ]);

  if (error) {
    statusMsg.className = 'alert alert-danger';
    statusMsg.innerText = 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.';
    statusMsg.style.display = 'block';
    console.error(error);
  } else {
    statusMsg.className = 'alert alert-success';
    statusMsg.innerText = 'تم إرسال طلب التسجيل بنجاح!';
    statusMsg.style.display = 'block';
    form.reset();
  }

  submitBtn.disabled = false;
  submitBtn.innerText = 'إرسال طلب التسجيل';
});
