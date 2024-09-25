import React from 'react'
import img1 from '../assets/pic1.jpeg'
import img2 from '../assets/pic-2.jpeg'
import img3 from '../assets/pic-3.jpeg'
import '../styles/testimony.css'

function Testimony() {
  return (
    <div>
      <body>
        <header>
            <div class='container'>
                <div class= 'container__left'>
                    <h1>Read what our customers love about us</h1>
                    <p>
                        Over 200 companies from diverse sectors consult us to enchance
                        the user experience of their products and services.
                    </p>
                    <p>
                        We have helped companies increase their customer base and generate
                        multifold revenue with our service.
                    </p>
                    <button> Read our success stories</button>
                </div>
                <div class= 'container__right'>
                    <div class="card">
                        <img src={img1} alt= "user"/>
                        <div class='card__content'>
                            <span><i className="ri-double-quotes-l"></i></span>
                            <div class='card__details'>
                                <p>
                                    We had a great time collaborating with the Filament team.
                                    They have high recommendation!
                                </p>
                                <h4>- Marnus Stephen</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img src={img2} alt= "user"/>
                        <div class='card__content'>
                            <span><i className="ri-double-quotes-l"></i></span>
                            <div class='card__details'>
                                <p>
                                    This team drastically improved our product's user experience
                                    & increased our business outreach.
                                </p>
                                <h4>- Andrew Jettpace</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img src={img3} alt= "user"/>
                        <div class='card__content'>
                            <span><i className="ri-double-quotes-l"></i></span>
                            <div class='card__details'>
                                <p>
                                   I absolutelty loved working with the Filament team. Complete 
                                   experts at what they do.
                                </p>
                                <h4>- Stacy Stone</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
      </body>
    </div>
  )
}

export default Testimony