import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";

class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      title: "",
      firstName: "",
      lastName: "",
      mobilePhone: "",
    };

    this.handleChange = props.handleChange ?
      props.handleChange.bind(this) : this.handleChange.bind(this);
    this.handleSubmit = props.handleSubmit ?
      props.handleSubmit.bind(this) : this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.mutation({variables: this.state});
  }

  handleChange(event) {
    let updateState = {}
    let target = event.target.id || event.target.name
    updateState[target] = event.target.value
    this.setState(updateState);
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <FormError error={this.props.errors.form}/>

        <FormControl
          margin="normal"
          error={Boolean(this.props.errors.email)}
          fullWidth
          required
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <FormFieldError error={this.props.errors.email}/>
        </FormControl>

        <FormControl
          margin="normal"
          error={Boolean(this.props.errors.password)}
          fullWidth
          required
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormFieldError error={this.props.errors.password}/>
        </FormControl>

        <FormControl
          margin="normal"
          variant="standard"
          error={Boolean(this.props.errors.firstName)}
          fullWidth
          required
        >
          <InputLabel htmlFor="title" sx={{ ml: 1.5 }}>Title</InputLabel>
          <Select
            id="title"
            name="title"
            label="Title"
            value={this.state.title}
            onChange={this.handleChange}
          >
            <MenuItem value={"none"}>None</MenuItem>
            <MenuItem value={"herr"}>Male</MenuItem>
            <MenuItem value={"frau"}>Female</MenuItem>
            <MenuItem value={"divers"}>Diverse</MenuItem>
          </Select>
          <FormFieldError error={this.props.errors.title}/>
        </FormControl>

        <FormControl
          margin="normal"
          error={Boolean(this.props.errors.firstName)}
          fullWidth
        >
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <FormFieldError error={this.props.errors.firstName}/>
        </FormControl>

        <FormControl
          margin="normal"
          error={Boolean(this.props.errors.lastName)}
          fullWidth
        >
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <FormFieldError error={this.props.errors.lastName}/>
        </FormControl>

        <FormControl
          margin="normal"
          error={Boolean(this.props.errors.mobile_phone)}
          fullWidth
        >
          <InputLabel htmlFor="mobilePhone">Mobile Phone</InputLabel>
          <Input
            id="mobilePhone"
            value={this.state.mobilePhone}
            onChange={this.handleChange}
          />
          <FormFieldError error={this.props.errors.mobile_phone}/>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={
            this.props.loading ||
            !this.state.email.trim() ||
            !this.state.password.trim() ||
            !this.state.title.trim()
          }
          sx={{ marginTop: 1 }}
        >
          {this.props.buttonText}
        </Button>
      </form>
    )
  }
}

export default PersonForm;
