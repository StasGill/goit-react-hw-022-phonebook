import React, { Component } from "react";
import ContactList from "./contactList/ContactList";
import { v4 as uuidv4 } from "uuid";
import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";
import style from "./app.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Rmione Line", number: "443-89-12" },
      { id: "id-4", name: "Kline Hermione ", number: "443-89-12" },
    ],
    name: "",
    number: "",
    filter: "",
    warning: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const checkName = this.state.name;

    const filteredName = this.state.contacts.some(
      (item) => item.name == checkName
    );

    console.log(filteredName);
    if (filteredName) {
      this.setState({ warning: true });
      console.log("warning");
    } else {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { name: this.state.name, id: uuidv4(), number: this.state.number },
        ],
        name: "",
        number: "",
      }));
      this.setState({ warning: false });
    }
  };
  handleDelete = (e) => {
    const id = e.target.name;
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.filter((item) => item.id !== id)],
    }));
  };
  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  filter = () => {
    const filtered = this.state.contacts.filter((item) =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filtered;
  };
  componentDidMount() {
    const dataLocal = JSON.parse(localStorage.getItem("phoneBook"));
    if (dataLocal) {
      this.setState({ contacts: [...dataLocal] });
    } else {
      return;
    }
  }
  componentDidUpdate() {
    localStorage.setItem("phoneBook", JSON.stringify(this.state.contacts));
  }

  render() {
    const { warning } = this.state;

    return (
      <>
        <CSSTransition
          in={warning}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className="warning">
            <p>Contact alredy exist</p>
          </div>
        </CSSTransition>

        <div className="addPanel">
          <CSSTransition in={true} timeout={300} classNames="alert" appear>
            <h1>Phonebook</h1>
          </CSSTransition>
        </div>

        <div className="addPanel">
          <form onSubmit={this.onSubmit}>
            <h2>Name</h2>
            <input
              type="text"
              className="addPanelInput"
              placeholder="Type name..."
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            ></input>
            <h2>Number</h2>
            <input
              type="text"
              className="addPanelInput"
              placeholder="Type number..."
              name="number"
              value={this.state.number}
              onChange={this.onChange}
            ></input>
            <br />
            <button type="submit" className="handleButton">
              Add contact
            </button>
          </form>
        </div>
        {this.state.contacts.length > 0 && (
          <div className="addPanel">
            <input
              name="filter"
              onChange={this.onChange}
              className="addPanelInput"
              placeholder="Find contact..."
            ></input>
          </div>
        )}
        <div className="addPanel">
          <h2>Contacts</h2>

          <TransitionGroup component="ul">
            {this.filter().map((contact) => (
              <CSSTransition key={contact.id} timeout={300} classNames="item">
                <ContactList
                  contact={contact}
                  handleDelete={this.handleDelete}
                  key={contact.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </>
    );
  }
}
