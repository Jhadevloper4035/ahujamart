import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({values , setValues , setLoading }) => {

    const { user } = useSelector((state) => ({ ...state }));


  const fileUploadAndResize = (e) => {

 
    let files = e.target.files; 
    let allUploadedFiles = values.image;

    if(files){

        for (let i = 0; i < files.length; i++) {

            Resizer.imageFileResizer( files[i], 720,720,"JPEG", 100, 0, (uri) => {
                axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user.user ? user.user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, image: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });

              },
              "base64"
            );
          }


    }


   


  };


  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
                    authtoken: user.user ? user.user.token : "",
                  },
        }
      )
      .then((res) => {
        setLoading(false);
        const { image } = values;
        let filteredImages = image.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, image: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };


   

  return (
    <> 

<div className="row d-flex ">
  <div className="col-md-12 d-flex  flex-wrap">
  
    {values.image.map((image) => (
      
      <Badge
        count={"X"}
        key={image.public_id}
        onClick={() => handleImageRemove(image.public_id)}
        style={{ cursor: "pointer" }}
      >
        <Avatar
          src={image.url}
          size={200}
          shape="square"
          className="m-3"
        />
      </Badge>

     


    ))}
  </div>
</div>


     
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
  
};

export default FileUpload;
