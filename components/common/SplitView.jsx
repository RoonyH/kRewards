var Paper = mui.Paper;

SplitView = React.createClass({
  render: function() {

    return <div>
      <Paper
        style={{
          float: 'left',
          width: '49.75%',
          textAlign: 'center',
          padding: '20px',
          marginRight: '0.25%'
        }}>
        {this.props.leftContent}
      </Paper>
      <Paper
        style={{
          float: 'left',
          width: '49.75%',
          padding: '20px',
          marginLeft: '0.25%'
        }}>
        {this.props.rightContent}
      </Paper>
    </div>
  }
})