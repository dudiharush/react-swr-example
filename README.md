# react-query-example

An example usage of react with react-query for fetching and caching server side data

each time you click the "Add" button, look at the data revalidation count, and notice that there is only one call to the server for data revalidation, ehich means that the rest of the data requests are taken from the cache.
