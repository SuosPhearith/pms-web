import { request as umiRequest } from 'umi';
import { ParamsType } from "@ant-design/pro-components";
interface DynamicRequestParams {
  [key: string]: any;
}
type SortOrder = 'ascend' | 'descend' | null ;


export const requestList = async (
  url: string,
  params: ParamsType,
  sort: Record<string, SortOrder>,
  filter: DynamicRequestParams,
  search: string = ''
) => {
  const { current = 1, pageSize = 20 } = params;

  // Prepare the sorting query
  const sortValue = Object.entries(sort)
    .map(([field, direction]) => {
      return direction === 'ascend' ? field : `-${field}`;
    })
    .join(',');

  // Prepare query parameters
  const query = {
    page: current,
    page_size: pageSize,
    search,
    ordering: sortValue,
    ...filter, // Include filter parameters dynamically
  };

  try {
    // Make the request using umi-request
    const response = await umiRequest(url, {
      method: 'GET',
      params: query, // Pass the query parameters
    });

    console.log(response.results)

    return {
      data: response.results,
      total: response.count,
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      data: [],
      total: 0,
    };
  }
};