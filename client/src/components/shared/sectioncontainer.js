import "./base.css"
import React from 'react';

const SectionContainer = ({ children }) => {
    return (
        <section className="questions-display-container">
            <div className="inner-container">
                {children}
            </div>
        </section>
    );
};

export default SectionContainer;


