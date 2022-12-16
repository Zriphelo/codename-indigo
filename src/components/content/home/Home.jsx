import Display from "../../common/Display"

const Home = () => {
    return (
        <div className="flex lg:mx-10 lg:px-4 justify-center">
            <div className="block">
                <div>
                    <Display title='"Codename Indigo" Project' 
                        titlec="mb-6"
                        className="py-6">
                        This is a small hobby project, currently WIP.
                    </Display>
                </div>
            </div>
        </div>
    )
}

export default Home