const getJobs = async () =>
    await (
        await fetch(
            "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k"
        )
    ).json();

export default getJobs;
