
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const universities = [
  {
    name: "JNTU",
    colleges: [
      { name: "JNTU College of Engineering" },
      { name: "JNTU School of Management" },
    ],
  },
  {
    name: "Andhra University",
    colleges: [
      { name: "AU College of Science" },
      { name: "AU College of Engineering" },
    ],
  },
  {
    name: "Ambedkar University",
    colleges: [
      { name: "Ambedkar College of Arts" },
      { name: "Ambedkar College of Commerce" },
    ],
  },
  {
    name: "Osmania University",
    colleges: [
      { name: "Osmania Law College" },
      { name: "Osmania Medical College" },
    ],
  },
];
const courses = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  birthday: Yup.date()
    .max(new Date(), "Birthday cannot be in the future")
    .required("Birthday is required"),
  graduationYear: Yup.number()
    .required("Graduation Year is required")
    .min(2000, "Year must be after 2000")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  university: Yup.string().required("Select a university"),
  college: Yup.string().required("Select a college"),
  gender: Yup.string().required("Select gender"),
  selectedCourses: Yup.array().min(1, "Select at least one course"),
});

const FormValidation = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const userData = location.state?.user || null;
  const isEditable = location.state?.isEditable ?? true;
  const [selectedUniversity, setSelectedUniversity] = useState(userData?.university || "");
const [selectAll, setSelectAll] = useState(userData?.selectedCourses?.length === courses.length);

  const redirectLogIn = () =>{
    navigate("/login");
  }

  return (
    <Formik
      initialValues={{
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        pincode: userData?.pincode || "",
        birthday: userData?.birthday || "",
        graduationYear: userData?.graduationYear || "",
        university: userData?.university || "",
        college: userData?.college || "",
        gender: userData?.gender || "",
        selectedCourses: userData?.selectedCourses || [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (isEditable) {
          let users = JSON.parse(localStorage.getItem("formData")) || []; 
          const index = users.findIndex((u) => u.email === values.email);
          if (index !== -1) {
            users[index] = values;
          } else {
            users.push(values);
          }
          localStorage.setItem("formData", JSON.stringify(users));
          alert("User details saved successfully!");
          resetForm();
          navigate("/login");
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="container-fluid d-flex justify-content-center form-main">
          <div className="submission-form">
            <div className="img-block">
              <img src="https://img.freepik.com/free-vector/forms-concept-illustration_114360-4957.jpg" alt="" />
              <p className="suggestion">already have an account? <span onClick={redirectLogIn}>Login</span></p>
            </div>
            <Form className="form-block">
              <div className="icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="d-flex field-flex">
                <div className="field-blocks">
                  <label>Name:</label>
                  <Field type="text" name="name" className="form-inputs" />
                  <ErrorMessage name="name" component="div" className="error-msg" />
                </div>
                <div className="field-blocks">
                  <label>Email:</label>
                  <Field type="email" name="email" className="form-inputs" />
                  <ErrorMessage name="email" component="div" className="error-msg" />
                </div>
              </div>
              <div className="d-flex field-flex">
                <div className="field-blocks">
                  <label>Phone Number:</label>
                  <Field type="text" name="phone" className="form-inputs" max-length="10" />
                  <ErrorMessage name="phone" component="div" className="error-msg" />
                </div>
                <div className="field-blocks">
                  <label>Pincode:</label>
                  <Field type="text" name="pincode" className="form-inputs" max-length="6" />
                  <ErrorMessage name="pincode" component="div" className="error-msg" />
                </div>
              </div>
              <div className="d-flex field-flex">
                <div className="field-blocks">
                  <label>Birthday:</label>
                  <Field type="date" name="birthday" className="form-inputs" />
                  <ErrorMessage name="birthday" component="div" className="error-msg" />
                </div>

                <div className="field-blocks">
                  <label>Graduation Year:</label>
                  <Field type="number" name="graduationYear" className="form-inputs" />
                  <ErrorMessage name="graduationYear" component="div" className="error-msg" />
                </div>
              </div>
              <div className="course-block">
                <label>Courses:</label>
                <div className="courses">
                  <label>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={selectAll}
                      onChange={() => {
                        const newSelectAll = !selectAll;
                        setSelectAll(newSelectAll);
                        setFieldValue("selectedCourses", newSelectAll ? courses : []);
                      }}
                    />
                    Select All
                  </label>
                </div>
                {courses.map((course) => (
                  <div className="courses" key={course}>
                    <label>
                      <input
                        className="checkbox"
                        type="checkbox"
                        name="selectedCourses"
                        value={course}
                        checked={values.selectedCourses.includes(course)}
                        onChange={(e) => {
                          const newSelectedCourses = e.target.checked
                            ? [...values.selectedCourses, course]
                            : values.selectedCourses.filter((c) => c !== course);

                          setSelectAll(newSelectedCourses.length === courses.length);
                          setFieldValue("selectedCourses", newSelectedCourses);
                        }}
                      />
                      {course}
                    </label>
                  </div>
                ))}
                <ErrorMessage name="selectedCourses" component="div" className="error-msg" />
              </div>
              <div className="field-blocks">
                <label>University:</label>
                <Field
                  as="select"
                  name="university"
                  className="form-inputs"
                  onChange={(e) => {
                    const selectedUni = e.target.value;
                    setFieldValue("university", selectedUni);
                    setFieldValue("college", "");
                    setSelectedUniversity(selectedUni);
                  }}
                  disabled={!isEditable}
                >
                  <option value="">Select University</option>
                  {universities.map((uni) => (
                    <option key={uni.name} value={uni.name}>{uni.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="university" component="div" className="error-msg" />
              </div>
              {selectedUniversity && (
                <div className="field-blocks">
                  <label>College:</label>
                  <Field as="select" name="college" className="form-inputs">
                    <option value="">Select College</option>
                    {universities.find((uni) => uni.name === selectedUniversity)?.colleges.map((college) => (
                      <option key={college.name} value={college.name}>{college.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="college" component="div" className="error-msg" />
                </div>
              )}

              <div className="field-blocks">
                <label>Gender:</label>
                <div className="radio-buttons">
                  <label><Field type="radio" name="gender" value="Male" /> Male</label>
                  <label><Field type="radio" name="gender" value="Female" /> Female</label>
                  <label><Field type="radio" name="gender" value="Other" /> Other</label>
                </div>
                <ErrorMessage name="gender" component="div" className="error-msg" />
              </div>
               {isEditable && <button type="submit" className="submit-button">Submit</button>}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormValidation;