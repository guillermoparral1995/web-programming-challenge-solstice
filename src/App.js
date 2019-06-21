import React from 'react';
import './App.scss';
import ContactList from "./ContactList/ContactList";
import {Route, Switch} from "react-router-dom";
import ContactDetail from "./ContactDetail/ContactDetail";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            others: []
        };
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    compare(name1, name2){
        return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
    }

    handleFavorite(contact){
        contact.isFavorite = !contact.isFavorite;
        this.setState(prevState => ({
            favorites: !contact.isFavorite ?
                prevState.favorites.filter(cn => cn.name !== contact.name).sort((cn1, cn2) => this.compare(cn1.name, cn2.name)) :
                prevState.favorites.concat(contact).sort((cn1, cn2) => this.compare(cn1.name, cn2.name)),
            others: !contact.isFavorite ?
                prevState.others.concat(contact).sort((cn1, cn2) => this.compare(cn1.name, cn2.name)) :
                prevState.others.filter(cn => cn.name !== contact.name).sort((cn1, cn2) => this.compare(cn1.name, cn2.name))
        }));
    }

    componentDidMount() {
        fetch('https://s3.amazonaws.com/technical-challenge/v3/contacts.json')
            .then(response => response.json())
            .then(response => {
                let favorites = [];
                let others = [];
                response.forEach(contact => {
                   contact.isFavorite ? favorites.push(contact) : others.push(contact);
                });
                favorites.sort((cn1, cn2) => this.compare(cn1.name, cn2.name));
                others.sort((cn1, cn2) => this.compare(cn1.name, cn2.name));
                this.setState({favorites: favorites, others: others});
            })
            .catch(error => console.error('There was an error while retrieving contacts: ', error));
    }

    render() {
        return (
            <div className='app'>
                <Switch>
                    <Route exact path='/' render={() => <ContactList favorites={this.state.favorites} others={this.state.others}/>}/>
                    <Route path='/contact/:name' render={(props) => <ContactDetail {...props} handleFavorite={this.handleFavorite}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
