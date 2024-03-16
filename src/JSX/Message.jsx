import Navbar from "./Navbar";
import "../CSS/Message.css";
import PhotoProfile from "../Imagini/PhotoProfile.png";


const Message = () => {

    return (
            
            <div className="AdminContainer">
                <Navbar />
                <div className="MessageContainer">
                    <div className="MessageBox"></div>
                    <div className="bottomMessage">
                        <button className="btn1"></button>
                        <input type="text" className="inputMessage"/>
                        <button  className="btn2"></button>
                        <button  className="btn3"></button>
                    </div>
                </div>
                <div className="ContactListContainer">
                    <div className="contactList">
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div> <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div> <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div> <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div> <div className="EmployeeRow">
                        <img src={PhotoProfile} alt="" className="EmployeeLstImg" />
                        <p className="EmployeeLstName">I don t have a name lmao</p>
                    </div>
                    </div>
                   
                    <div className="searchContact">
                        <input type="text" className="inputSearchContact" placeholder="search"/>
                    </div>
                </div>

            </div>
            
    );
}
export default Message;