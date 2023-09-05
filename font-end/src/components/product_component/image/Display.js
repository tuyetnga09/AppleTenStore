import { useEffect, useState } from "react";
import { add, update, detail } from "../../../service/image.service";
import { Input } from "reactstrap";
import "../../../css/form.css";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

