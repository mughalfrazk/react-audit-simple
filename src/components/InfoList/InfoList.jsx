import { Fragment } from 'react';

const info = [
  {
    key: 'Name',
    value: 'John Doe',
  },
];

const InfoList = ({ data = info }) => {
  return (
    <div className="card pt-3 pb-2">
      <div className="row align-items-baseline">
        {data.map((item, index) => (
          <Fragment key={item.key}>
            <div className="col-md-2 text-end">
              <h6 className="m-0 pe-3 p-md-0">{item.key}:</h6>
            </div>
            <div className="col-md-10">
              <h5 className='ps-3 p-md-0'>{item.value}</h5>
            </div>
            {index < data.length - 1 && (
              <div className="col-12">
                <hr className="mt-1 mb-3" style={{ opacity: 0.1 }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfoList;
