import * as yup from "yup"

const addressesSchema= {
    address:yup.string().required(),
    number:yup.string().required(),
    zipCode:yup.string().required(),
    city:yup.string().required(),
    state:yup.string().required(),
    complement:yup.string(),
}

export{addressesSchema}