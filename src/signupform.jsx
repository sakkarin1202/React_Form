import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    nameTitleTha: "",
    firstnameTha: "",
    lastnameTha: "",
    nameTitleEng: "",
    firstnameEng: "",
    lastnameEng: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    idCard: "",
    password: "",
    mobile: "",
    email: "",
    acceptTerms: false // เพิ่มค่า acceptTerms เริ่มต้นเป็น false
  });

  const [errors, setErrors] = useState({
    firstnameThaError: "",
    firstnameEngError: "",
    idCardError: "",
    passwordError: "",
    emailError: "",
    acceptTermsError: "", // เพิ่มข้อผิดพลาดสำหรับการยอมรับเงื่อนไข
    mobileError: "" // เพิ่มข้อผิดพลาดสำหรับเบอร์โทรศัพท์
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    validateForm(name, value); // เรียกฟังก์ชัน validateForm เพื่อตรวจสอบข้อมูล
  };

  const validateForm = (fieldName, value) => {
    let newErrors = { ...errors };
  
    switch (fieldName) {
      case "firstnameTha":
        newErrors.firstnameThaError = value.match(/^[\u0E01-\u0E5B]+$/) ? "" : "กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น";
        break;
      case "firstnameEng":
        newErrors.firstnameEngError = value.match(/^[A-Za-z\s]+$/) ? "" : "กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น";
        break;
      case "idCard":
        newErrors.idCardError = value.length === 13 ? "" : "กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก เป็นตัวเลขทั้งหมด";
        break;
      case "password":
        newErrors.passwordError = value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/) ? "" : "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วยอักษรตัวเล็ก อักษรตัวใหญ่ และตัวเลข";
        break;
        case "mobile":
  newErrors.mobileError = value.match(/^\d{10}$/) ? "" : "กรุณากรอกเบอร์โทรศัพท์ 10 หลักเท่านั้น";
  break;

      case "email":
        newErrors.emailError = value.match(/@webmail.npru.ac.th$/) ? "" : "กรุณากรอกอีเมลที่มีโดเมน @webmail.npru.ac.th เท่านั้น";
        break;
      case "acceptTerms":
        newErrors.acceptTermsError = value ? "" : "กรุณาติ๊กเพื่อยอมรับข้อมูล";
        break;
      default:
        break;
    }
  
    setErrors(newErrors);
  };
  

  const handleSubmit = () => {
    let newErrors = { ...errors };
  
    // ตรวจสอบว่ายอมรับข้อมูลแล้วหรือไม่
    if (!formData.acceptTerms) {
      newErrors.acceptTermsError = "กรุณาติ๊กเพื่อยอมรับข้อมูล";
    }
  
    // ตรวจสอบข้อผิดพลาดใน errors
    for (const key in errors) {
      if (errors[key] !== "") {
        newErrors.acceptTermsError = "กรุณากรอกข้อมูลให้ถูกต้อง";
        break;
      }
    }
  
    // เพิ่มการตรวจสอบ mobileError
    if (newErrors.mobileError !== "") {
      newErrors.acceptTermsError = "กรุณากรอกข้อมูลให้ถูกต้อง";
    }
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).every(error => error === "")) {
      alert("ลงทะเบียนสำเร็จ");
    } else {
      alert("กรุณากรอกข้อมูลให้ถูกต้อง");
    }
  };
  
  
  
  

  const days = Array.from({ length: 31 }, (_, i) => i + 1); // วันที่ 1-31
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]; // เดือน
  const currentYear = new Date().getFullYear(); // ปีปัจจุบัน (ค.ศ.)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // ปี (พ.ศ.)

  return (
    <section className="container mt-4">
      <div className="mb-4">
        <div className="card border-0 shadow p-4">
          <h5 className="fw-bolder mb-3">ข้อมูลทั่วไป</h5>
          <div className="rounded border p-4">
            <div className="row">
              <div className="col-lg-2 mb-3">
                <label htmlFor="nameTitleTha" className="form-label">
                  คำนำหน้า <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="nameTitleTha"
                  id="nameTitleTha"
                  onChange={handleChange}
                  value={formData.nameTitleTha}
                  required=""
                >
                   <option value="นาย">เลือกคำนำหน้า</option> 
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
                <div className="invalid-feedback">กรุณาเลือกคำนำหน้า</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="firstnameTha" className="form-label">
                  ชื่อ ภาษาไทย <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstnameThaError && 'is-invalid'}`}
                  name="firstnameTha"
                  id="firstnameTha"
                  onChange={handleChange}
                  value={formData.firstnameTha}
                  required=""
                />
                <div className="invalid-feedback">{errors.firstnameThaError}</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="lastnameTha" className="form-label">
                  นามสกุล ภาษาไทย <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastnameTha"
                  id="lastnameTha"
                  onChange={handleChange}
                  value={formData.lastnameTha}
                  required=""
                />
                <div className="invalid-feedback">กรุณากรอกนามสกุล ภาษาไทย</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 mb-3">
                <label htmlFor="nameTitleEng" className="form-label">
                  คำนำหน้า <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="nameTitleEng"
                  id="nameTitleEng"
                  onChange={handleChange}
                  value={formData.nameTitleEng}
                  required=""
                >
                  <option value="Mr.">Select a prefix.</option> 
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
                <div className="invalid-feedback">กรุณาเลือกคำนำหน้า</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="firstnameEng" className="form-label">
                  ชื่อ ภาษาอังกฤษ <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstnameEngError && 'is-invalid'}`}
                  name="firstnameEng"
                  id="firstnameEng"
                  onChange={handleChange}
                  value={formData.firstnameEng}
                  required=""
                />
                <div className="invalid-feedback">{errors.firstnameEngError}</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="lastnameEng" className="form-label">
                  นามสกุล ภาษาอังกฤษ <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastnameEng"
                  id="lastnameEng"
                  onChange={handleChange}
                  value={formData.lastnameEng}
                  required=""
                />
                <div className="invalid-feedback">
                  กรุณากรอกนามสกุล ภาษาอังกฤษ
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 mb-3">
                <label htmlFor="birthDate" className="form-label">
                  วันเกิด <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthDate"
                  id="birthDate"
                  onChange={handleChange}
                  value={formData.birthDate}
                  required=""
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกวันเกิด</div>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="birthMonth" className="form-label">
                  เดือน <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthMonth"
                  id="birthMonth"
                  onChange={handleChange}
                  value={formData.birthMonth}
                  required=""
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกเดือนเกิด</div>
              </div>
              <div className="col-lg-3 mb-3">
                <label htmlFor="birthYear" className="form-label">
                  ปี (พ.ศ.) <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthYear"
                  id="birthYear"
                  onChange={handleChange}
                  value={formData.birthYear}
                  required=""
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกปีเกิด (พ.ศ.)</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="idCard" className="form-label">
                หมายเลขบัตรประชาชน <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control text-center ${errors.idCardError && 'is-invalid'}`}
                name="idCard"
                id="idCard"
                value={formData.idCard}
                onChange={handleChange}
                required=""
                placeholder="ไม่ต้องใส่อักขระขีดและเว้นวรรค"
              />
              <div className="invalid-feedback">{errors.idCardError}</div>
            </div>
          </div>
          <h5 className="fw-bolder mt-5 mb-3">สร้างรหัสผ่าน</h5>
          <div className="rounded border p-4">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                รหัสผ่าน สำหรับเข้าใช้งาน <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control ${errors.passwordError && 'is-invalid'}`}
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                required=""
                placeholder="a-z, A-Z, 0-9, 8 อักขระขึ้นไป"
              />
              <div className="invalid-feedback">{errors.passwordError}</div>
            </div>
          </div>
          <h5 className="fw-bolder mt-5 mb-3">ข้อมูลติดต่อ</h5>
          <div className="rounded border p-4">
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                เบอร์มือถือ <span className="text-danger">*</span>
              </label>
              <input
  type="text"
  className={`form-control ${errors.mobileError && 'is-invalid'}`}
  name="mobile"
  id="mobile"
  value={formData.mobile}
  onChange={handleChange}
  required=""
  placeholder="ไม่ต้องใส่อักขระขีด"
/>
<div className="invalid-feedback">{errors.mobileError}</div>

            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                อีเมล <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.emailError && 'is-invalid'}`}
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange} 
                required=""
                placeholder="@webmail.npru.ac.th"
              />
              <div className="invalid-feedback">{errors.emailError}</div>
            </div>
          </div>
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              onChange={handleChange}
              checked={formData.acceptTerms}
            />
            <label className="form-check-label" htmlFor="acceptTerms">
              ข้าพเจ้ายอมรับว่าข้อมูลข้างต้นเป็นข้อมูลจริงของข้าพเจ้า เพื่อใช้สำหรับลงทะเบียนหลักสูตรระยะสั้น ของคณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครปฐม
            </label>
            <div className="invalid-feedback d-block">{errors.acceptTermsError}</div>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>ลงทะเบียน</button>
        </div>
      </div>
    </section>
  );
}

export default SignupForm;
