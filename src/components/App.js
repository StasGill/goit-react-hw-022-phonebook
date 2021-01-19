import React, {Component} from 'react'
import ContactList from './contactList/ContactList'
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            
        ],
        name: '',
        number: '',
        filter: '',
      }
    
      
      
    onChange = (e) => {
          this.setState({ [e.target.name]: e.target.value });
         
       }
    onSubmit = e => {
           e.preventDefault();
           this.setState(prevState => ({
            contacts: [...prevState.contacts, {name: this.state.name,id:uuidv4(),number: this.state.number }],name: '',number:'',
        }));
       }
    handleDelete =  e => {
        const id = e.target.name
        this.setState(prevState => ({
            contacts: [...prevState.contacts.filter(item => item.id !== id), ]
        }));
       
       }
    handleFilter = (e) => {
            console.log(e.target.value)
            this.setState({ filter: e.target.value });
       }
    filter = () => {
        const filtered = this.state.contacts.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return filtered
       }
       componentDidMount() {
         
        const dataLocal = JSON.parse(localStorage.getItem('phoneBook'))
        if(dataLocal){
            this.setState( ({ contacts: [...dataLocal]}));
        }else{
            return
        }
       
        
    }
    componentDidUpdate(){
        localStorage.setItem('phoneBook',JSON.stringify(this.state.contacts))
    }

    render() {
        
        return(  <>
        <div className="addPanel">
            <h1>Phonebook</h1>
            <form onSubmit={this.onSubmit}>
                <h2>Name</h2>
                <input type="text" className="addPanelInput" placeholder="Type name..." name="name" value={this.state.name} onChange={this.onChange}></input>
                <h2>Number</h2>
                <input type="text" className="addPanelInput" placeholder="Type number..." name="number" value={this.state.number} onChange={this.onChange}></input>
                <br/><button type="submit" className="handleButton">Add contact</button>
            </form>
        </div>
        <div className="addPanel">
        <h2>Contacts</h2>
           <input name="filter" onChange={this.onChange} className='addPanelInput' placeholder='Find contact...'></input>
            <ul className="list">
                {
                    this.filter().map( contact => <ContactList contact={contact} handleDelete={this.handleDelete} key={contact.id}/>) 
                }
            </ul>
                </div>
        </>)
    }
}

