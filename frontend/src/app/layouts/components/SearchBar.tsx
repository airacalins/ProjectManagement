import React from 'react';
import { Grid, Header, Search, Segment } from 'semantic-ui-react';

interface Props {
    isLoading?: boolean,
    value?: string
}

const SearchBar: React.FC<Props> = ({ isLoading, value }) => {
    return (
        <Grid>
            <Grid.Column>
                <Search
                    input={{ icon: 'search', iconPosition: 'left' }}
                    loading={isLoading}
                    // onResultSelect={this.handleResultSelect}
                    // onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    //     leading: true,
                    // })}
                    // results={results}
                    value={value}
                />
            </Grid.Column>
        </Grid>
    );
}

export default SearchBar;