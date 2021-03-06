import gql from "graphql-tag";

export const QUERY = {
    FIND_AVAILABLE_JOBS: gql`
  query {
  jobs(where: {done: {_eq: false}}) {
    id,
    name,
    description,
    companies {
      name,
      id
    }
  }
}
`,
    FIND_ALL: gql`
  query {
  jobs {
    id,
    source,
    destination,
    description,
    companies {
      name,
      id
    }
  }
}
`,
    FIND_ALL_BY_DRIVER_ID_AND_STATUS: gql`
        query jobByDriverId($driver: Int! $status: String!) {
            job_drivers(where: {driver_id:{_eq: $driver} status:{_eq: $status}}) {
                jobs {
                    id,
                    description,
                    source,
                    destination
                },
                status
            }
        }
    `
};


export const SUBSCRIPTION = {
    FIND_AVAILABLE_JOBS: gql`
  subscription {
  jobs(where: {done: {_eq: false} }) {
    id,
    source,
    name,
    destination,
    description,
    companies {
      name,
      id
    }
  }
}
`,
    ALL_BY_DRIVER_ID_AND_STATUS: gql`
        subscription jobByDriverId($driver: Int! $status: [String]!) {
            job_drivers(where: {driver_id:{_eq: $driver} status:{_in: $status}}) {
                jobs {
                    id,
                    name,
                    description,
                    source,
                    destination,
                    companies {
                      name,
                      id
                    }               
                },
                status
            }
        }
    `,
    FIND_JOB_BY_ID: gql`
subscription Job( $jobId: Int! $driver: Int!) {
    jobs(where: {id: {_eq: $jobId}}) {
        id,
        name,
        source,
        destination,
        description,
        companies {
          name,
          id
        }
        job_drives(where: {driver_id: {_eq: $driver}}) {
            status,
            drivers {
                id
            }
        }
    }
}
`,
};

export const MUTATION = {
    APPLY_FOR_JOB: gql`
mutation applyJob($driver: Int!, $job: Int!, $status: String!) {
    insert_job_drivers(objects:[
    {driver_id: $driver, job_id: $job, status: $status}
  ]) {
    returning {
      drivers {
        name
      }, jobs {
        id
      }
    }
  }
}
`,
    START_JOB: gql`
        mutation statJob($driver: Int!, $job: Int!) {
            update_job_drivers(
                where:{job_id:{_eq: $job} driver_id:{_eq: $driver}}
                _set:{status:"IN_PROGRESS"}
              ) {
                returning {
                  job_id
                }
              }
        }
    `
};


export default {
  QUERY,
  MUTATION,
  SUBSCRIPTION
};
