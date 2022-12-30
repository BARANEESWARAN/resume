import React from 'react';
import 'antd/dist/antd.css';
import './resume.css'
import axios from 'axios';
import { Spin } from 'antd'
import  { useCallback, useEffect, useState } from 'react';
import Delete from '../delete.json'
import formData from 'form-data';
import { Header } from 'antd/lib/layout/layout';
import { CloudUploadOutlined ,DeleteTwoTone,LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Button, Card, Row, Form, Input ,Col} from 'antd';
import Lottie from 'lottie-react';
import loading from '../loading-bar.json'
import cloud from '../upload-icon.json'
const { Dragger } = Upload;

const { TextArea } = Input;
const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Resume = () => {

 // const [ state, setState ] = useState([])
 const [ imageUrl, setImageUrl ] = useState("");
 const [ match, setmatch ] = useState("");
 const [match1, setmatch1 ] = useState([]);
 const [visibleval,setvisibleval]=useState(false);
 const [ skills, setSkills ] = useState('');
 const[deletebtn,setdeletebtn]=useState(false)
 const[loding ,setLoding] = useState(true);
 const[Loder,setLoder] = useState(false);
 const[upload,setupload] = useState(false);
 const[submitbtn,setsubmitbtn]=useState(false);
 const[deleteicon,setdeleteicon]=useState(true)
 const [name,setname]=useState();
 const [email,setemail]=useState();
 const [Phoneno,setePhoneno]=useState();
 const [skill,setskill]=useState();
 const [jobRole,setjobRole]=useState();
 const [new1,setnew1]=useState()
 const [experience,setexperience]=useState();
 const[anotherupload,setanotherupload] = useState(false);
 const [classname,setclassname]=useState('resumecardbefore');





 <img width={150} src={"1.png"} />

 

 const getBase64 = (img,callback) => {
   const reader = new FileReader();
   reader.addEventListener('load',() => callback(reader.result));
   reader.readAsDataURL(img);
 }

 const handleUpload = (info) => {

     console.log(info.fileList[0].originFileObj,'original obj');
     setImageUrl(info.fileList[0].originFileObj);
     if (info == ""){
        setLoding(true)
        setanotherupload(false)
      
    }
    else{
        setLoding(false)
        setanotherupload(true)
       
    }
   
 }
   
 


 const  uploadImage = (file) => {
   
    setdeleteicon(false)
    setLoder(true)
    setdeletebtn(true)
    setupload(true)
   setLoding(true)
   var data1 = new formData();
   console.log(file)
   data1.set('file', imageUrl);
   let url = "http://157.245.110.53:4000/resume"
   console.log(data1.get('file'),'selected file');
   // console.log(data1,'selected file');
     axios({
     method: 'post',
     url: 'http://157.245.110.53:4000/resume',
     data : data1,
     headers: { "Content-Type": "multipart/form-data" },
   })
   
     .then((res)=>{
        setnew1(res.data)
        console.log(res.data,"kkkk")
        setdeleteicon(true)
        setclassname("resumecardafter")
        
        setname(res.data.Name[0].concat(" ",res.data.Name[1]))
        setemail(res.data.Email)
        setePhoneno(res.data.Phone_Number)
        let skillval=res.data.Skills
        let val=skillval.map((obj)=>(obj))
        setskill(val)
        setjobRole(res.data.JobeRole)
        setexperience(res.data.Total_years)
     
      
        setsubmitbtn(true)
        setLoder(false)
      
        if (res.Name == ""){
            
            setdeletebtn(true)
           
        }
       
        else{
         
            setLoder(false)
        }
        if (res.Name != ""){
          
            setdeletebtn(true)
            setdeletebtn(false)
        }
       
        else{
            setdeletebtn(false)
        }
       console.log(res,'APIResponse')
       setvisibleval(true);
  setmatch1(res.data)
let skillVal = res.data.Skills;
  console.log(skillVal,'skillVal');


        setSkills(skillVal)




  
  const num2=match1.Name[0].concat(" ", match1.Name[1])
  
  
}).catch((err)=>{
    console.log(err,'Error')
})
}


console.log(skills,'Skils')
const HandleClick =() =>{
    // anotherupload(false)
    setvisibleval(false);
    setupload(false)
    setdeletebtn(false)
    setImageUrl("")

    // setLoding(false)
}
const deletechange =() =>{
    setupload(false)
    setvisibleval(false);
  setanotherupload(false)
  setsubmitbtn(false)
  setclassname("resumecardbefore")
  setLoding(true)
}
const handleapi =() =>{
    setclassname("resumecardbefore")
    setupload(false)
    setvisibleval(false);
  setanotherupload(false)
  setsubmitbtn(false)
    let dataval;
    dataval={"Email":email,"JobeRole":jobRole,"Name":[name],"Phone_Number":Phoneno,"Skills":[skill],"Total_years":experience
    }
    axios({
        method: 'post',
        url: 'http://localhost:3000/resumea_details/create',
        data :dataval,
        // headers: { "Content-Type": "application/json" },
      })
      .then((res)=>{
        console.log(dataval)
        if(res.data.status===404){
        alert(res.data.error.message)
      
        }
        else{
            alert("upload succesfully")
        }
       
        console.log(res.data)
      })
      setvisibleval(false)

      
    
 
}


    return (
        <div className='Resume-Extractor'>
            <Card className={classname}>
                <Header>
                    {/* <div>
                        <Lottie animationData={loading} style=
                        {{
                            width:"100px",
                            position:"relative",
                            left:"200px"
                            }}></Lottie></div>
                    <div> */}

                        <h1>Resume Extractor</h1>
                        {}


                        {anotherupload==true?
 <Button className="Upload-Button" onClick={deletechange} disabled={deletebtn}  >
 <p className="ant-upload-drag-icon">
     <p>Delete</p>
    { /* <DeleteTwoTone  className='sv'/> */}

    <Lottie animationData={Delete} loop={deleteicon} style={{width:"70px",position:"relative",left:"149px",bottom:"28px",}}/>
 </p>
</Button>: <Dragger {...props} className="Upload-Button" onChange={handleUpload} disabled={upload} >
                        <p className="ant-upload-drag-icon">
                            <p>Drag and Drop</p>
                            {/*<CloudUploadOutlined />*/}
                            <Lottie animationData={cloud} style={{width:"70px",position:"relative",left:"165px",bottom:"13px",}}/>
                        </p>
                    </Dragger>}

                        {/* {
                         deletebtn== true ? 
                         <Button onClick={HandleClick}>
                            Delete Resume
                         </Button>  :null
                     
                        } */}
                        {/* {
                           loding == false ? 
                           <Button disabled type="primary" onClick={uploadImage}>Submit</Button>  
                           : <Button type="primary" onClick={uploadImage}>Submit</Button>
                        } */}
{submitbtn==true?null:<Button disabled={loding} type="primary" onClick={uploadImage}>Submit</Button>  }


                        {
                            Loder == true ? 
                            <Row className='spinicon'><Col className='spiniconcol' >
                                {/* <LoadingOutlined /> */}
                                <Lottie animationData={loading} style=
                        {{
                            width:"100px",
                            position:"relative",
                            left:"200px"
                            }}></Lottie>
                                </Col></Row> :<div></div>
                        }
                        
                       
                        
               
                    {visibleval?
                    <div className='Form'>
                        <Row>
                            <Form.Item
                                label="Name"
                                name="Name"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        <Row><Input  value={name} name="name" onChange={(e)=>{setname(e.target.value)}} /></Row>
                        <Row>
                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        <Row><Input name="email" value={email} onChange={(e)=>{setemail(e.target.value)}} /></Row>
                        <Row>
                            <Form.Item
                                label="Phone No"
                                name="Phone No"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        <Row>
                            
                            
                            <Input  value={Phoneno} onChange={(e)=>{setePhoneno(e.target.value)}}  /></Row>
                        <Row>
                            <Form.Item
                                label="Skills"
                                name="Skills"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        {/* {match1.Skills.map((res)=>
                         <TextArea rows={4} value={res}  />
                        
                       )} */}
                     
                     <TextArea rows={2} value={skill} onChange={(e)=>{setskill(e.target.value)}} />

       
                         {/* {match1.Skills.map((text) => (
     <TextArea value={text}  />
      ))}  */}
                            
                        <br/>
                        <Row>
                            <Form.Item
                                label="Qualification"
                                name="Qualification"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        <Row><Input value={jobRole} onChange={(e)=>{setjobRole(e.target.value)}} /></Row>
                        <Row>
                            <Form.Item
                                label="Total Year of Experience "
                                name="Total Year of Experience"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            />
                        </Row>
                        <Row><Input value={experience} onChange={(e)=>{setexperience(e.target.value)}}  /></Row>
                        <Row>
                            <Col offset={2} span={3}> <Button onClick={handleapi} className="btn">Submit</Button></Col></Row>
                    </div>:null}
                </Header>
            </Card>
        </div>
    );
};

export default Resume;