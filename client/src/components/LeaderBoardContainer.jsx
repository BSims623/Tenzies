import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/LeaderBoard'
import { LeaderBoardLegend } from '.'
import { useDashboardContext } from '../pages/Dashboard'


const LeaderBoardContainer = () => {
    const { topTenRows } = useDashboardContext();

    return (
        <Wrapper className='container mt-3 rounded'>
            <LeaderBoardLegend className='legend' />
            {topTenRows}
        </Wrapper>
    )
}

export default LeaderBoardContainer