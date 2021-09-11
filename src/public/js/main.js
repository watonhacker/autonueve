const d = document

import { printModels } from "/js/spareSearcher/printModels.js"
import { getSubmodels } from "/js/spareSearcher/getSubmodels.js"
import { printSubmodels } from "/js/spareSearcher/printSubmodels.js"
import { printYears } from "/js/spareSearcher/printYears.js"
import { searchBtn } from "./spareSearcher/searchBtn.js"

d.addEventListener("DOMContentLoaded", () => {

    getSubmodels()
    printSubmodels()
    printYears()
    printModels()
    searchBtn()



})