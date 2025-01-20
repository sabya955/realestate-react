import React from "react";
import './index.css';



const About = ()=>{
    return(
        <div id="about" className="container2">
            <div className="about">
                <p>Who We Are</p>
                <h1>About Us</h1>
                <h3>Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </h3>
                <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor.</p>
                </div> 
                <div className="aboutPhoto">
                    <img src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJvdXQlMjBvZmZpY2V8ZW58MHx8MHx8fDA%3D" alt="about us"/>
                </div>

        </div>
    )

}

export default About;