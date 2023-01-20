import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function ProfileForm({ allUsers, setAllUsers, messages, setMessages, currentUser, setCurrentUser}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState,
    formState: { errors, submittedData }
  } = useForm();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
        language: '',
        proficiency: '',
        schedule: '',
        bio: ''
      });
    }
  }, [formState, submittedData, reset]);
 
  useEffect(() => {
    if (currentUser.userId > 0) {
        setValue("userId", currentUser.userId);
        setValue("username", currentUser.username);
        setValue("firstName", currentUser.firstName);
        setValue("lastName", currentUser.lastName);
        setValue("language", currentUser.language);
        setValue("proficiency", currentUser.proficiencyLevel);
        setValue("schedule", currentUser.schedule.length > 1 ? currentUser[1] : "");
        setValue("bio", currentUser.bio);
    }
  }, []);

  const onSubmit = (newUserObj) => {
    let retypedUser = {
      userId: newUserObj.userId,
      firstName: newUserObj.firstName,
      lastName: newUserObj.lastName,
      language: newUserObj.language,
      proficiency: newUserObj.proficiency,
      schedule: [newUserObj.schedule],
      bio: newUserObj.bio,
    }

    newUserObj.schedule && retypedUser.schedule.push(newUserObj.schedule);

  }

  if (currentUser.userId > 0) {
    fetch("http://localhost:8080/user" + currentUser.userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(retypedUser)
    })
    .then(response => {
      if (response.status === 204) {
        let message = {
          status: "success",
          text: "User \"" + retypedUser.firstName + " " + retypedUser.lastName + "'s\" profile has been successfully edited"
        }
        
        const editUserProfile = () => {
          let filteredUser = allUsers.filter(user => user.userId !== currentUser.userId);
          filteredUser.push(retypedUser);
          return filteredUser;
        }

        setAllUsers(editUserProfile());
        setMessages([...messages, message]);
        setCurrentUser({});
        navigate("/profile");
      } else {
        let message = {
          status: "failure",
          text: "Profile could not be edited."
        }
        setMessages([...messages, message]);
      }
    })
    .catch(error => setMessages([...messages, { type: "failure", text: error.message}]));
  } else {
    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(retypedUser)
    })
    .then(response => {
      if (response.status === 201) {

        let message = {
          status: "success",
          text: "User \"" + retypedUser.firstName + " " + retypedUser.lastName + "'s\" profile has been successfully created"
        }

        setAllUsers(editUserProfile());
        setMessages([...messages, message]);
        setCurrentUser({});
        navigate("/profile");
      } else {
        let message = {
          status: "failure",
          text: "Profile could not be created."
        }
        setMessages([...messages, message]);
      }
    })
    .catch(error => setMessages([...messages, { type: "failure", text: error.message}]));
  }

  const selectScheduleOptions = [
    { value: "1", label: "Monday - Morning" },
    { value: "2", label: "Monday - Afternoon" },
    { value: "3", label: "Monday - Evening" },
    { value: "4", label: "Tuesday - Morning" },
    { value: "5", label: "Tuesday - Afternoon" },
    { value: "6", label: "Tuesday - Evening" },
    { value: "7", label: "Wednesday - Morning" },
    { value: "8", label: "Wednesday - Afternoon" },
    { value: "9", label: "Wednesday - Evening" },
    { value: "10", label: "Thursday - Morning" },
    { value: "11", label: "Thursday - Afternoon" },
    { value: "12", label: "Thursday - Evening" },
    { value: "13", label: "Friday - Morning" },
    { value: "14", label: "Friday - Afternoon" },
    { value: "15", label: "Friday - Evening" },
    { value: "16", label: "Saturday - Morning" },
    { value: "17", label: "Saturday - Afternoon" },
    { value: "18", label: "Saturday - Evening" },
    { value: "19", label: "Sunday - Morning" },
    { value: "20", label: "Sunday - Afternoon" },
    { value: "21", label: "Sunday - Evening" }
  ];

  const registerOptions = {
    schedule: { required: "Availability times required."}
  };
    
  return (
    <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label mt-3" htmlFor="profile-firstName">First Name</label>
      <input 
        className="form-control"
        type="text"
        id="profile-firstName"
        {...register("firstName", {required: "First Name is required."})}
      />
      <p className="form-error-message">{errors.firstName?.message}</p>

      <label className="form-label mt-3" htmlFor="profile-lastName">Last Name</label>
      <input 
        className="form-control"
        type="text"
        id="profile-lastName"
        {...register("lastName", {required: "Last Name is required."})}
      />
      <p className="form-error-message">{errors.lastName?.message}</p>

      <label className="form-label mt-3" htmlFor="profile-language">Language</label>
      <select
        className="form-select"
        type="text"
        id="profile-language"
        {...register("language", {required: "Language is required."})}
      >
        <option value="" selected disabled>Programming Language</option>
        <option value="Java">Java</option>
        <option value="C">C</option>
        <option value="C#">C#</option>
        <option value="C++">C++</option>
        <option value="JavaScript">Javascript</option>
        <option value="Python">Python</option>
        <option value="PHP">PHP</option>
        <option value="SQL">SQL</option>
      </select>
      <p className="form-error-message">{errors.language?.message}</p>

      <label className="form-label mt-3" htmlFor="profile-proficiency">Proficiency Level</label>
      <select
        className="form-select"
        type="text"
        id="profile-proficiency"
        {...register("proficiency", {required: "Proficiency level is required."})}
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>
      <p className="form-error-message">{errors.proficiency?.message}</p>

      <label className="form-label mt-3" htmlFor="profile-schedule">Availability</label>
      <Controller 
        className="schedule"
        control={control}
        defaultValue=""
        rules={registerOptions.schedule}
        render={() => (
          <Select options={selectScheduleOptions} {...register("schedule")} label="Text field" />
        )}
      />
      {/* <select
        className="form-select"
        type="text"
        id="profile-schedule"
        {...register("schedule", {required: "Schedule is required."})}
      > */}
        {/* <option value="1">Monday - Morning</option>
        <option value="2">Monday - Afternoon</option>
        <option value="3">Monday - Evening</option>
        <option value="4">Tuesday - Morning</option>
        <option value="5">Tuesday - Afternoon</option>
        <option value="6">Tuesday - Evening</option>
        <option value="7">Wednesday - Morning</option>
        <option value="8">Wednesday - Afternoon</option>
        <option value="9">Wednesday - Evening</option>
        <option value="10">Thursday - Morning</option>
        <option value="11">Thursday - Afternoon</option>
        <option value="12">Thursday - Evening</option>
        <option value="13">Friday - Morning</option>
        <option value="14">Friday - Afternoon</option>
        <option value="15">Friday - Evening</option>
        <option value="16">Saturday - Morning</option>
        <option value="17">Saturday - Afternoon</option>
        <option value="18">Saturday - Evening</option>
        <option value="19">Sunday - Morning</option>
        <option value="20">Sunday - Afternoon</option>
        <option value="21">Sunday - Evening</option> */}
      {/* </select> */}
      <p className="form-error-message">{errors.schedule?.message}</p>

      <label className="form-label mt-3" htmlFor="profile-bio">Bio</label>
      <input 
        className="form-control"
        type="text"
        id="profile-bio"
        {...register("bio")}
      />
      <p className="form-error-message">{errors.bio?.message}</p>

    </form>
  )
}

export default ProfileForm;