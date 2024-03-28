const buildRequestData = () => {
    let data = {}

    const elements = document.querySelectorAll(".field_container")

    for (const iterator of elements) {
        const prop = iterator.querySelector("input").id

        data[prop] = iterator.querySelector("input").value
    }

    return data
}

export default buildRequestData