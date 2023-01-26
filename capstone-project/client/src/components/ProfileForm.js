import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProfileForm({ currentUser, setCurrentUser, messages, setMessages,makeId,parseResponseMessage }) {

  const auth = useContext(AuthContext);
  console.log("profile auth",auth);
  const appUserId = auth.currentUser.appUserId
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState,
    formState: { errors, submittedData },
  } = useForm();
  
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({
  //         firstName: '',
  //         lastName: '',
  //         languageId: '',
  //         proficiencyLevel: '',
  //         schedule: '',
  //         bio: '',
  //       });    
  //   }
  //   }, [formState, submittedData, reset]);
  useEffect(() => {
    if (appUserId) {
        fetch("http://localhost:8080/user/" + appUserId, {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => parseResponseMessage(response))
        .then(appUser => {

            setValue("firstName", appUser.firstName);
            setValue("lastName", appUser.lastName);
            setValue("languageId", appUser.languageId);
            setValue("bio", appUser.bio);
            setValue("schedule",appUser.schedule);
            setValue("proficiencyLevel", appUser.proficiencyLevel);
           
        })
        .catch(error => {
            // If a user tries to access an appUser by an ID that doesn't exist in the database...
            if (error.message === "Unexpected end of JSON input") {
                navigate("/404");
            } else {
                setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]);
            }
        });
    }
}, []);

  // useEffect(() => {
  //   console.log("asdf"+currentUser)
  //   if (currentUser.appUserId > 0) {
  //         setValue("appUserId", currentUser.appUserId);
  //         setValue("firstName", currentUser.firstName);
  //         setValue("lastName", currentUser.lastName);
  //         setValue("language", currentUser.language);
  //         setValue("proficiency", currentUser.proficiencyLevel);
  //         setValue("schedule", currentUser.schedule.length > 1 ? currentUser[1] : "");
  //         setValue("bio", currentUser.bio);
  //   }
  // }, []);

  const onSubmit = (newUserObj) => {
    

    let retypedUser = {...newUserObj};
    

      // firstName: newUserObj.firstName,
      // lastName: newUserObj.lastName,
      // language: newUserObj.languageId,
      // proficiencyLevel: newUserObj.proficiencyLevel,
      // bio: newUserObj.bio,
      // schedule:newUserObj.schedule,
    
    

    // newUserObj.schedule && retypedUser.schedule.push(newUserObj.schedule);

    if (appUserId) {
      retypedUser["appUserId"] = appUserId;

      fetch("http://localhost:8080/create_profile/" + appUserId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.currentUser.token,
        },
        body: JSON.stringify(retypedUser),
      })
        .then((response) => {
          if (response.status === 204) {
            let message = {
              type: "success",
              text: "User profile has been successfully added"
            }

            setMessages([...messages, message]);
            navigate("/");
          } else {
            let message = {
              type: "failure",
              text: "User profile could not be edited."
            }
            setMessages([...messages, message]);
          }
        })
        .catch((error) => setMessages([...messages, { type: "failure", text: error.message }]));
    } 
  };

  const options = [
    { value: 1, label: "Monday - Morning" },
    { value: 2, label: "Monday - Afternoon" },
    { value: 3, label: "Monday - Evening" },
    { value: 4, label: "Tuesday - Morning" },
    { value: 5, label: "Tuesday - Afternoon" },
    { value: 6, label: "Tuesday - Evening" },
    { value: 7, label: "Wednesday - Morning" },
    { value: 8, label: "Wednesday - Afternoon" },
    { value: 9, label: "Wednesday - Evening" },
    { value: 10, label: "Thursday - Morning" },
    { value: 11, label: "Thursday - Afternoon" },
    { value: 12, label: "Thursday - Evening" },
    { value: 13, label: "Friday - Morning" },
    { value: 14, label: "Friday - Afternoon" },
    { value: 15, label: "Friday - Evening" },
    { value: 16, label: "Saturday - Morning" },
    { value: 17, label: "Saturday - Afternoon" },
    { value: 18, label: "Saturday - Evening" },
    { value: 19, label: "Sunday - Morning" },
    { value: 20, label: "Sunday - Afternoon" },
    { value: 21, label: "Sunday - Evening" },
  ];

return (
  <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
    <label className="form-label mt-3 text-white" htmlFor="profile-firstName">
      First Name
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-firstName"
      {...register("firstName", { required: "First Name is required." })}
    />
    <p className="form-error-message text-white">{errors.firstName?.message}</p>

    <label className="form-label mt-3 text-white" htmlFor="profile-lastName">
      Last Name
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-lastName"
      {...register("lastName", { required: "Last Name is required." })}
    />
    <p className="form-error-message text-white">{errors.lastName?.message}</p>

    <label className="form-label mt-3 text-white" htmlFor="profile-language">
      Language
    </label>
    <select
      className="form-select"
      type="text"
      id="profile-language"
      {...register("languageId", { required: "Language is required." })}
    >
      <option value="1">Java</option>
      <option value="2">C</option>
      <option value="3">C#</option>
      <option value="4">C++</option>
      <option value="5">Javascript</option>
      <option value="6">Python</option>
      <option value="7">PHP</option>
      <option value="8">SQL</option>
    </select>
    <p className="form-error-message text-white">{errors.language?.message}</p>

    <label className="form-label mt-3 text-white" htmlFor="profile-proficiency">
      Proficiency Level
    </label>
    <select
      className="form-select"
      type="text"
      id="profile-proficiency"
      {...register("proficiencyLevel", {
        required: "Proficiency level is required.",
      })}
    >
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Expert">Expert</option>
    </select>
    <p className="form-error-message text-white">{errors.proficiency?.message}</p>

    <label className="form-label mt-3 text-white" htmlFor="profile-schedule">
      Availability
    </label>
    
    <Controller
      control={control}
      defaultValue={options.map(c => c.value)}
      name="schedule"
      render={({ field: { onChange, value, ref, name},}) => (
        <Select 
          inputRef={ref}
          classNamePrefix={"react-select"}
          options={options} 
          isMulti
          value={options.filter(c => value.includes(c.value))}
          onChange={val => onChange(val.map(c => c.value))}
        />
      )} 
      {...register("schedule")}
    />

    <p className="form-error-message text-white">{errors.schedule?.message}</p>

    <label className="form-label mt-3 text-white" htmlFor="profile-bio">
      Bio
    </label>
    <input
      className="form-control"
      type="text"
      id="profile-bio"
      {...register("bio")}
    />

    <button className="btn btn-primary mt-3" type="submit">Submit</button>
    <button className="btn btn-secondary mt-3 ms-2" type="button" onClick={() => navigate("/")}>Cancel</button>
  </form>
);
}

export default ProfileForm;
