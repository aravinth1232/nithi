import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../config';




const App = () => {

  const navigate = useNavigate();



  const [step, setStep] = useState(1);
  const [employeeId,setEmployeeId] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  
   const [password, setPassword] = useState("");
    const [passwordvisible, setPasswordVisible] = useState(false);
    const [designation,setDesignation] = useState("");
    const [qualification,setQualification] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [role,setRole] = useState("");
    const [aadharFile, setAadharFile] = useState(null);
    const [panFile, setPanFile] = useState(null);
    const [bankPassbookFile, setBankPassbookFile] = useState(null);
    // const [photo, setPhoto] = useState(null);


    const handleFileChange = (e, setter) => {
      const file = e.target.files[0];
      if (file) {
        setter(file);
      }
    };

  


    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [capturedPhoto,setCapturedPhoto] = useState(null);

    useEffect(() => {
      let stream;
      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current && isCameraOn) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
  
      if (isCameraOn) {
        startCamera();
      }
  
      // Cleanup: Stop the camera when the component unmounts or camera is turned off
      return () => {
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      };
    }, [isCameraOn]);
  
    const capturePhoto = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Convert canvas to image URL
        const imageData = canvas.toDataURL("image/png");
        setCapturedPhoto(imageData);
      }
    };




    
  
    

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };


  // if (capturedPhoto){ 
  //  console.log(capturedPhoto) 
      
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // Append form fields
    formData.append("employeeId", employeeId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("designation", designation);
    formData.append("role", role);
    formData.append("qualification", qualification);
    formData.append("phone", phone);
    formData.append("address", address);

    // Append photo and files
    if (capturedPhoto){ 
    
      formData.append("photo", capturedPhoto)
      setIsCameraOn(false);
      
    }

    if (aadharFile) formData.append("aadhar", aadharFile);
    if (panFile) formData.append("pan", panFile);
    if (bankPassbookFile) formData.append("bank_passbook", bankPassbookFile);

    // Send formData to backend API
    try {
      const response = await fetch(`${url}/submit.php`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status === "success") {
        alert(result.message);
        navigate("/login");

      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  




  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto items-center justify-start pt-10">
          <h1 className='text-xl font-semibold'>Sign Up</h1>
        <form onSubmit={handleSubmit} 
         className='w-full min-h-96 flex flex-col gap-7 px-4 py-6 bg-transparent backdrop-blur-lg shadow-lg'
        >
          {step === 1 && (
            <div className="">
              <h2 className="text-xl font-semibold mb-4">Step 1</h2>
              <div className="flex flex-col gap-3 mb-4 w-full">
              <div className='flex flex-col gap-2'>
                <label 
                className='font-semibold '
                htmlFor="id">Employee Id</label>
                <input
                   className='
                   bg-primary-100 uppercase
                   focus:border-2 focus:border-primary-500
                   border-2 px-2 py-2 focus:outline-none rounded-xl'
                  placeholder='#123ABc'
                  type="text"
                  name="id"
                  id="id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label 
                className='font-semibold '
                htmlFor="name">Name</label>
                <input
                   className='
                   bg-primary-100
                   focus:border-2 focus:border-primary-500
                   border-2 px-2 py-2 focus:outline-none rounded-xl'
                  placeholder='xyz123'
                  type="name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label 
                className='font-semibold '
                htmlFor="email">Email</label>
                <input
                   className='
                   bg-primary-100
                   focus:border-2 focus:border-primary-500
                   border-2 px-2 py-2 focus:outline-none rounded-xl'
                  placeholder='xyz@gmail.com'
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
               <div className='flex flex-col gap-2 w-full'>
                <label 
                className='font-semibold '
                htmlFor="password">Password</label>
                <div className='relative w-full'>
                  <input
                     className=' w-full
                     bg-primary-100
                     focus:border-2 focus:border-primary-500
                     border-2 px-2 py-2 focus:outline-none rounded-xl'
                    placeholder='***'
                    type={passwordvisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    disabled={password.length < 1}
                    onClick={() => setPasswordVisible(!passwordvisible)}
                    className={`absolute top-1/2 right-2 transform -translate-y-1/2
                      ${password.length > 1 ? "opacity-100" : "opacity-0 cursor-not-allowed"}
                      transition-opacity`}
                  >
                    {passwordvisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              </div>
            </div>
          )}

          {step === 2 && (
            <div>
             <h2 className="text-xl font-semibold mb-4">Step 2</h2>
             {/* Designation Dropdown */}
                <div className="mb-4">
                  <label 
                   className='font-semibold '>Designation</label>
                  <select
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className='w-full
                    bg-primary-100
                    focus:border-2 focus:border-primary-500
                    border-2 px-2 py-2 focus:outline-none rounded-xl'
                    required
                  >
                    <option value="" disabled>
                      Select your designation
                    </option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="tester">Tester</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label 
                   className='font-semibold '>Role</label>
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='w-full
                    bg-primary-100
                    focus:border-2 focus:border-primary-500
                    border-2 px-2 py-2 focus:outline-none rounded-xl'
                    required
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="employee">Employee</option>
                    {/* <option value="admin">Admin</option> */}
                  </select>
                </div>

                <div className="mb-4">
                  <label 
                   className='font-semibold '>Qualification</label>
                  <select
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none "
                    required
                  >
                   <option value="" disabled>
                      Select your qualification
                    </option>
                    <option value="highschool">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              
              <div className='flex flex-col gap-2 mb-4'>
                <label 
                className='font-semibold '
                htmlFor="phone">Phone Number</label>
                <input
                 className='
                 bg-primary-100
                 focus:border-2 focus:border-primary-500
                 border-2 px-2 py-2 focus:outline-none rounded-xl'
                  placeholder='1234567'
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>      

              <div className="mb-4">
              <label className='font-semibold '>Address</label>
              <textarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                
                className='
                w-full   bg-primary-100
                   focus:border-2 focus:border-primary-500
                   border-2 px-2 py-2 focus:outline-none rounded-xl'
                placeholder="Enter your address"
                rows="3"
                required
              />
            </div>


            </div>
          )}

          {step === 3 && (
            <div>
               <h2 className="text-xl font-semibold mb-4">Step 3</h2>


                <div className="mb-6 flex flex-col gap-3">
                  <label                   
                  className='font-semibold '>
                    Aadhar Card <span className="mt-2 text-sm text-gray-500">Accepted formats: .pdf, .doc, .docx</span>
                  </label>
                  <input
                    type="file"
                    name="aadhar"
                    onChange={(e) => handleFileChange(e, setAadharFile)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                    accept=".pdf,.doc,.docx"
                    required
                  />                  
                </div>
                <div className="mb-6 flex flex-col gap-3">
                  <label                   
                  className='font-semibold '>
                    Pan Card <span className="mt-2 text-sm text-gray-500">Accepted formats: .pdf, .doc, .docx</span>
                  </label>
                  <input
                    type="file"
                    name="pan"
                    onChange={(e) => handleFileChange(e, setPanFile)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                    accept=".pdf,.doc,.docx"
                    required
                  />                  
                </div>

                <div className="mb-6 flex flex-col gap-3">
                  <label 
                  
                  className='font-semibold '>
                    Bank Passbook <span className="mt-2 text-sm text-gray-500">Accepted formats: .pdf, .doc, .docx</span>
                  </label>
                  <input
                    type="file"
                    name="bank_passbook"
                    onChange={(e) => handleFileChange(e, setBankPassbookFile)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  
                </div>


            </div>
          )}

            {

              step === 4  && (
                
            <div>


        <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 4: Capture Your Live Photo</h2>
              
              {!isCameraOn && (
        <button
          onClick={() => setIsCameraOn(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          Start Camera
        </button>
      )}

      {/* Video Feed */}
      {isCameraOn && (
        <div className="relative w-full max-w-md mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Hidden Canvas for Photo Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capture Button */}
      {isCameraOn && (
        <button
        type="button"
          onClick={capturePhoto}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Capture Photo
        </button>
      )}

      {/* Display Captured Photo */}
      {capturedPhoto && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Captured Photo:</h2>
          <img
            src={capturedPhoto}
            alt="Captured"
            className="w-full max-w-md rounded shadow mb-4"
          />
          <button
            onClick={() => {
              setCapturedPhoto(null);
              setIsCameraOn(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retake Photo
          </button>
        </div>
      )}
              
              
              
              </div>     
            
           
           
           
            )}
          




          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-4 py-2 bg-gray-300 rounded-lg ${
                step === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
              }`}
            >
              Previous
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4  bg-primary-500 text-white rounded-lg hover:bg-primary-700"
              >
                Next
              </button>
            )} 
            
             {  step === 4 &&   (
                            
             <button
             type="submit"
             className="relative inline-block px-8 py-2 font-bold text-white bg-primary-500 rounded-[40px]
             hover:text-white active:scale-90 transition-all duration-500 overflow-hidden group">
               <span className="relative z-10">Submit</span>
               
               {/* Skewed Background */}
               <span className="absolute inset-0 w-full h-full bg-primary-700 transform -translate-x-[95%] group-hover:translate-x-0 
                               transition-transform duration-300 ease-out origin-left skew-x-[45deg] group-hover:skew-x-0"></span>
             </button>
            )}
          </div>
        </form>
      
    </div>
  );
};

export default App;
