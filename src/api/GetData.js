const GetData = () => (
    fetch('https://xbot.com.vn/standards.json',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },

        })
        .then(res => res.json())
);

export default GetData;