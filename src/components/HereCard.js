import WeatherCard from "./WeatherCard";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../store/reducer";

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);
