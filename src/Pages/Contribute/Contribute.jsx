import React from 'react'
import styled from 'styled-components';
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const Contribute = () => {
    const axiosSecure = useAxiosSecure()
  
    const handleDonation = async (e) => {
        e.preventDefault()
         const form = e.target;
      const contributorInfo = {
            contributorName: form.name.value,
            contributorEmail: form.email.value,
            donationAmount: form.amount.value,
          }
    //   console.log(contributorInfo)
          const res = await axiosSecure.post('/create-funding-session',
             contributorInfo)
         // console.log(res.data)
          window.location.href = res.data.url
    }

  return (
     <StyledWrapper>
      <div className="form-container">
        <div className="logo-container">
          Donation Form
        </div>

        <form className="form" onSubmit={handleDonation}>       
          <div className="form-group">
            <label htmlFor="name">Donor's Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Donor's Email</label>
            <input type="text" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label> Donation Amount </label>
            <input type="number" id="amount" name="amount" min={1} required />
          </div>
          <button 
          className="form-submit-btn" type="submit">
          Donate </button>
        </form>

      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;    /* vertical center */
    justify-content: center; /* horizontal center */

  .form-container {
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: #212121;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084),
     0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #ccc;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }

  .form-container .form-submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    color: #fff;
    background-color: #212121;
    border: none;
    width: 100%;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container .form-submit-btn:hover {
    background-color: #313131;
  }

  .form-container .link {
    color: #1778f2;
    text-decoration: none;
  }

  .form-container .signup-link {
    align-self: center;
    font-weight: 500;
  }

  .form-container .signup-link .link {
    font-weight: 400;
  }

  .form-container .link:hover {
    text-decoration: underline;
  }`;

 
export default Contribute