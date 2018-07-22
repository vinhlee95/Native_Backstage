





   <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight } ]}>
            {
               this.state.isSaving
               ?
               <Modal title="Saving your information" />
               :
               <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                  <Input 
                     placeholder="First Name"
                     value={this.state.firstName}
                     onChangeText={(firstName) => this.setState({ firstName })}
                     returnKeyType='next'
                     reference={input => this.inputs['firstName'] = input}
                     onSubmitEditing={() => this.handleFocusNextField('lastName')} />
                  <Input 
                     placeholder="Last Name"
                     value={this.state.lastName}                  
                     onChangeText={(lastName) => this.setState({ lastName })}
                     returnKeyType='next'
                     reference={input => this.inputs['lastName'] = input}
                     />
                  <Label title='Home' icon='ios-home-outline' />

                  <View>
                     <LocationSearch  
                        placeholder="Adress" 
                        defaultValue={this.state.location.description}
                        handleSelectLocation={this.handleSelectLocation}
                        submitLocationDescription={this.submitLocationDescription} />
                     <Input 
                        placeholder="House number" 
                        value={this.state.location.houseNumber}
                        onChangeText={(houseNumber) => this.setState({ location: {...this.state.location, houseNumber} })}
                        returnKeyType='next'
                        reference={input => this.inputs['houseNumber'] = input}
                        onSubmitEditing={() => this.handleFocusNextField('postalCode')}
                        />
                  </View>
                  <View>
                     <Input 
                        placeholder="Postal Code"
                        value={this.state.location.postalCode} 
                        keyboardType="numeric"
                        onChangeText={(postalCode) => this.setState({ location: {...this.state.location, postalCode} })} 
                        returnKeyType='done'
                        reference={input => this.inputs['postalCode'] = input}
                        />
                  </View>
                  {
                     this.state.location.description
                     ?
                     <View style={{flex:1}}>
                        <Label title='Map' icon='ios-map-outline' />
                        <View style={styles.mapView}>
                           <View style={styles.noteContainer}>
                              <Text style={styles.note}>Tap on the map to view full-screen</Text>  
                           </View>        
                           <Map 
                              location={this.state.location} 
                              scrollEnabled={false}  
                              onPress={() => this.props.navigation.navigate('MapFullScreen', {
                                 location: this.state.location,
                              })}
                              style={{ height: 300,zIndex: 1 }} />
                        </View>
                     </View>
                     : null
                  }
               </ScrollView>
            }
         </Animated.View>