import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import MaterialCrud from "../components/material/MaterialCrud";

export default props => (
	<Routes>
		<Route exact path="/" element={<Home />} />
		<Route path="/materials" element={<MaterialCrud />} />
		<Route path="*" element={<Home />} />
	</Routes>
);