import React from 'react';

// This is stateless functional component
const HomePage = (props) => {
    return (
        <div>
          <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui text container">
              <h1 className="ui inverted stackable header">
                <img
                  className="ui image massive"
                  src="/assets/logo.png"
                  alt="logo"
                />
                <div className="content">聚乐</div>
              </h1>
              <h2>Do whatever you want to do with your friends</h2>
              <div onClick={() => props.history.push('/activities')} className="ui huge white inverted button">
                开始
                <i className="right arrow icon" />
              </div>
            </div>
          </div>
        </div>
    );
}

export default HomePage;