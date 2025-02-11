/* eslint-disable react/prop-types */
function PageHeader(props) {
  return (
    <header className="page-header">
        <div className="container">
          <h1>
            {props.titulo}
          </h1>
        </div>
      </header>
  )
}

export default PageHeader