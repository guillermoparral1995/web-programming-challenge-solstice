import React from "react";
import {cleanup, render, fireEvent, waitForElement} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import App from "./App";
import {within} from "@testing-library/dom";

afterEach(cleanup);

function renderWithRouter(
    ui,
    {
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

it('renders the contact list and allows navigating to user details', async () => {
    const { container, getByText } = renderWithRouter(<App />);
    await waitForElement(() => container.querySelector('img[src*="harry-potter"]'));
    const leftClick = { button: 0 };
    fireEvent.click(container.querySelector('img[src*="harry-potter"]'), leftClick);
    getByText('Harry.Potter@gryffindor.edu');
});

it('returns to contact list when clicking link', async() => {
    const { container, getByText } = renderWithRouter(<App />);
    await waitForElement(() => container.querySelector('img[src*="harry-potter"]'));
    const leftClick = { button: 0 };
    fireEvent.click(container.querySelector('img[src*="harry-potter"]'), leftClick);
    fireEvent.click(getByText('< Contacts'));
    getByText('Favorite Contacts');
});

it('toggles favorites correctly', async() => {
    const { container, getByText } = renderWithRouter(<App />);
    await waitForElement(() => container.querySelector('img[src*="harry-potter"]'));
    const leftClick = { button: 0 };
    fireEvent.click(container.querySelector('img[src*="harry-potter"]'), leftClick);
    fireEvent.click(container.querySelector('.star-img-container'));
    fireEvent.click(getByText('< Contacts'));
    const otherContactsContainer = container.querySelector('.others');
    within(otherContactsContainer).getByText('Harry Potter');

    // toggled Harry Potter from favorite to other

    fireEvent.click(container.querySelector('img[src*="pink-ranger"]'), leftClick);
    fireEvent.click(container.querySelector('.star-img-container'));
    fireEvent.click(getByText('< Contacts'));
    const favoriteContactsContainer = container.querySelector('.favorites');
    within(favoriteContactsContainer).getByText('Pink Ranger');

    // toggle Pink Ranger from other to favorite
});
