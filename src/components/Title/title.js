import React from 'react';

// CSS
import styles from './title.module.css'

const Title = props => {
    const { size, children } = props;
    var title;

    switch (size) {
        case 1:
            title = <h1>{children}</h1>;
            break;
        case 2:
            title = <h2>{children}</h2>;
            break;
        case 3:
            title = <h3>{children}</h3>;
            break;
        case 4:
            title = <h4>{children}</h4>;
            break;
    }

    return (
        <div className={styles.root}>
            {title}
        </div>
    );
}

export default Title;
