// استبدل المفاتيح الخاصة بمشروعك في Supabase
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

  // إدخال البيانات في جدول students
  const { data, error } = await supabaseClient
    .from('students')
    .insert([
      { 
        student_name: studentName, 
        grade: grade, 
        address: address, 
        phone_number: phone,
        status: 'قيد المراجعة'
      }
    ]);

  if (error) {
    statusMsg.className = 'alert alert-danger';
    statusMsg.innerText = 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.';
    statusMsg.style.display = 'block';
  } else {
    statusMsg.className = 'alert alert-success';
    statusMsg.innerText = 'تم إرسال طلب التسجيل بنجاح!';
    statusMsg.style.display = 'block';
    form.reset();
  }

  submitBtn.disabled = false;
  submitBtn.innerText = 'إرسال طلب التسجيل';
});
