import $ from 'jquery';
const Logout = () =>{
    const baseUrl = "http://localhost:4001/";
    const noUser = {_id: "-1", roleId: -1};
    localStorage.setItem("USER", JSON.stringify(noUser));
    $.get(baseUrl+"logout");
    return (<div>
        <h3>logged out</h3>
        <p><a href='/'>Log in</a></p>
        
    </div>)
    //window.location.replace("/");
}


export default Logout;