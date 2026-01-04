import React from 'react'
import { Link } from 'react-router';
import styled from 'styled-components';
const Banner = () => {
  return ( 
         <StyledWrapper>
      <div className="cards flex flex-col lg:flex-row justify-evenly items-center py-3 space-y-4 lg:space-y-0  lg:py-5">
        <div className="card red">
          <Link className="tip" to={'/login'}>Join as a donor</Link>
        </div>

        <div className="card blue">
          <Link className="tip" to={'/search'}>Search Donors</Link>
        </div>
      </div>
    </StyledWrapper>
   
  )
}

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100px;
    width: 250px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: transform 0.4s, filter 0.4s;
  }

  .red { background-color: #f43f5e; }
  .blue { background-color: #3b82f6; }

  .tip { font-size: 20px; font-weight: 700; }
  .second-text { font-size: 0.7em; }

  .cards:hover .card:not(:hover) {
    filter: blur(4px);
    transform: scale(0.9);
  }

  .card:hover {
    transform: scale(1.1);
  }
`;

export default Banner